fetch("http://localhost:3000/api/products/")
    .then((response) => {
        return response.json();
    })

    .then((kanap) => {
        return produits(kanap);
    })

    function produits(data) {
        data.forEach((kanap) => {
            // Création de l'ancre
            const id = kanap._id;
            const lien = document.createElement("a");
            lien.href = "./product.html?id=" + id;
            // Création d’une balise dédiée au produit
            const article = document.createElement("article")
            // Création des balises
            const image = document.createElement("img");
            image.src = kanap.imageUrl;
            image.alt = kanap.altTxt + ", "+ kanap.name;
            const h3 = document.createElement("h3")
            h3.classList.add("productName");
            h3.textContent = kanap.name;
            const p = document.createElement("p")
            p.classList.add("productDescription");
            p.textContent = kanap.description;

           // Récupération de l'élément du DOM qui accueillera les produits
            const items = document.querySelector("#items");
            // On rattache les balises à leurs parents
            items.appendChild(lien);
            lien.appendChild(article);
            article.appendChild(image);
            article.appendChild(h3);
            article.appendChild(p);

        });
    }