 let cart = localStorage.getItem("productSelected");
 console.log("cart", cart);

 let cart2 = JSON.parse(localStorage.getItem("productSelected"));
 console.log("cart2", cart2);

 let products = [];

 // récupération de l'ensemble du catalogue de produits à partir de l'API
 products = fetch(`http://localhost:3000/api/products/`)
     // transformation du retour de l'API en tableau
     .then(data => data.json())
     //  .then(data => console.log("cart23", data))
     .then(productsList => {
         // variable globale products : permet d'avoir les détails des produits de l'API
         products = productsList;
         // on appelle display Cart pour l'affichage
         displayCart();
     });

 function displayCart() {
     cart2 = JSON.parse(localStorage.getItem("productSelected"));
     console.log("cart2", cart2);
     cart2.forEach((cartProduct) => {
         const productEx = products.find((product) => product._id == cartProduct.idProduct);
         //  console.log("test2", productEx);
         const items = document.querySelector("#cart__items");
         // construction du HTML
         const article = document.createElement("article");
         article.className = "cart__item";
         article.dataset.id = "product-" + cartProduct.idProduct;
         article.dataset.color = "product-" + cartProduct.color;
         items.appendChild(article);

         const divCartItemImg = document.createElement("div");
         divCartItemImg.className = "cart__item__img";
         article.appendChild(divCartItemImg);

         const divImg = document.createElement("img");
         divImg.src = productEx.imageUrl;
         divImg.alt = productEx.altTxt;
         divCartItemImg.appendChild(divImg);

         const divCartItemContent = document.createElement("div");
         divCartItemContent.className = "cart__item__content";
         article.appendChild(divCartItemContent);

         const divCartItemContentDescription = document.createElement("div");
         divCartItemContentDescription.className = "cart__item__content__description";
         divCartItemContent.appendChild(divCartItemContentDescription);

         const h2ContentDescription = document.createElement("h2");
         h2ContentDescription.className = "cart__item__content__titlePrice";
         h2ContentDescription.textContent = productEx.name;
         divCartItemContentDescription.appendChild(h2ContentDescription);

         const pContentColor = document.createElement("p");
         pContentColor.textContent = cartProduct.color;
         divCartItemContentDescription.appendChild(pContentColor);

         const pContentPrice = document.createElement("p");
         pContentPrice.className = "cart__item__content__titlePrice";
         pContentPrice.textContent = productEx.price + ` €`;
         divCartItemContentDescription.appendChild(pContentPrice);

         const divCartItemContentSettings = document.createElement("div");
         divCartItemContentSettings.className = "cart__item__content__settings";
         divCartItemContent.appendChild(divCartItemContentSettings);

         const divContentSettingsQuantity = document.createElement("div");
         divContentSettingsQuantity.className = "cart__item__content__settings__quantity";
         divCartItemContentSettings.appendChild(divContentSettingsQuantity);

         const pSettingsQuantity = document.createElement("p");
         pSettingsQuantity.textContent = "Qté :";
         divContentSettingsQuantity.appendChild(pSettingsQuantity);

         const inputSettingsQuantity = document.createElement("input");
         inputSettingsQuantity.className = "itemQuantity";
         inputSettingsQuantity.value = cartProduct.quantity;
         inputSettingsQuantity.setAttribute("type", "number");
         inputSettingsQuantity.setAttribute("min", "1");
         inputSettingsQuantity.setAttribute("max", "100");
         inputSettingsQuantity.setAttribute("name", "itemQuantity");
         inputSettingsQuantity.setAttribute("value", cartProduct.quantity)
         divContentSettingsQuantity.appendChild(inputSettingsQuantity);

         //  inputSettingsQuantity.onclick = function (ev) {
         //      changeQuantity(ev.target.value, cartProduct.idProduct, cartProduct.colors);
         //  }

         const divContentSettingsDelete = document.createElement("div");
         divContentSettingsDelete.className = "cart__item__content__settings__delete"
         divCartItemContentSettings.appendChild(divContentSettingsDelete);

         const pSettingsDelete = document.createElement("p");
         pSettingsDelete.className = "deleteItem";
         pSettingsDelete.textContent = 'Supprimer';
         divContentSettingsDelete.appendChild(pSettingsDelete);
         pSettingsDelete.onclick = function () {
             removeFromCart(cartProduct.idProduct, cartProduct.colors);
         }
     })
 }

 //  // fonction pour suprrimer un élément du panier (LS)
 //  function removeFromCart(productId, color) {
 //      let cart = getCart();
 //      // on filtre dans le panier (cart) par l'ID
 //      cart = cart.filter((p) => ((p.idProduct != productId) || (p.colors != color)));
 //      localStorage.setItem("productSelected", JSON.stringify(cart));
 //      displayCart();
 //  }