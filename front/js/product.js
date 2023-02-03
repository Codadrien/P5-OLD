// On récupére l’ id du produit à afficher
const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");

//On requête l'api
fetch("http://localhost:3000/api/products/" + id)
    .then((response) => {
        return response.json();
    })

    .then((kanap) => {
        // On insérer un produit et ses détails dans la page Produit
        document.getElementById("headTitle").textContent = kanap.name;
        document.getElementById("img-produits").src = kanap.imageUrl;
        document.getElementById("img-produits").alt = kanap.altTxt;
        document.getElementById("title").textContent = kanap.name;
        document.getElementById("price").textContent = kanap.price;
        document.getElementById("description").textContent = kanap.description;

        const colorSelect = document.getElementById("colorSelect");
        const optionColorArray = kanap.colors;
        for (let i = 0; i < optionColorArray.length; i++) {
            let options = optionColorArray[i];
            let color = document.createElement("option");
            color.textContent = options;
            color.value = options;
            colorSelect.appendChild(color);
        }
    })

const quantity = document.getElementById("quantity");

// écoute de l'action click sur le bouton d'ajout au panier (en fonction callback)
addToCart.addEventListener("click", (event) => {

    // on place le choix de couleur et de quantité dans une variable
    const colorSelected = colorSelect.value;
    const quantitySelected = quantity.value;

    // on récupère les valeurs du formulaire (infos du produit sélectionné)
    let productSelected = {
        color: colorSelected,
        quantity: quantitySelected,
        idProduct: id,
    }
    console.log("productSelected", productSelected);
    verifyInput(productSelected);
})

// vérification de la conformité des informations selectionnés
function verifyInput(productSelected) {
    // alerte si aucune couleur n'est sélectionnée
    if (colorSelect.value == []) {
        alert("Veuillez choisir une couleur");

        // confirmation si couleur selectionnée et quantité comprise entre 1 et 100.
    } else if (quantity.value > 0 && quantity.value < 101) {
        window.confirm("Votre sélection a bien été prise en compte.");

        // envoi de la sélection au panier par l'appel de la fonction addCart
        addCart(productSelected);
        window.location.assign("cart.html");

    } else {
        alert("Veuillez saisir une quantité comprise entre 0 et 100")
    }
}


function addCart(productSelected) {

    //transformation de la valeur du produit sélectionné pour l'ajouter au tableau panier.
    let cart = JSON.parse(localStorage.getItem("productSelected"));

    // Si le tableau panier est nul, la fonction créé un nouveau tableau.
    if (cart == null) {
        cart = [];
        // On push le nouveau produit sélectionné et ses informations dans le tableau créé.
        cart.push(productSelected);
        localStorage.setItem("productSelected", JSON.stringify(cart));

    } else {

        // on créé la variable getproduct pour chercher dans le tableau existant.
        const getProduct = cart.find((kanap) =>

            // S'il existe ce produit dans le panier
            kanap.idProduct == productSelected.idProduct && // et

            // S'il existe ce produit avec la même couleur dans le panier
            kanap.color == productSelected.color);

        // s'il existe déjà le même produit avec les même option, on ajoute seulement en quantité.
        if (getProduct) {
            getProduct.quantity = Number(productSelected.quantity) + Number(getProduct.quantity);
            localStorage.setItem("productSelected", JSON.stringify(cart));

        } else {
            cart.push(productSelected);
            localStorage.setItem("productSelected", JSON.stringify(cart));
        }
    }
}