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
    })