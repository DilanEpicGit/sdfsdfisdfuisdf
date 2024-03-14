document.addEventListener("DOMContentLoaded", function() {
    var addButton = document.getElementById("addButton");
    var ajouterProduitButton = document.getElementById("ajouterProduitButton");
    var productList = document.getElementById("productList");
  
    // Vérifier l'adresse IP du développeur
    var developerIP = "127.0.0.1"; // Adresse IP du développeur autorisé
  
    // Charger les produits sauvegardés
    var savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    savedProducts.forEach(function(product) {
      afficherProduit(product);
    });
  
    // Ajouter un produit
    ajouterProduitButton.addEventListener("click", function() {
      var nomProduit = document.getElementById("nomProduit").value;
      var noteEtoile = document.getElementById("noteEtoile").value;
      var noteEtoileAvecEmoji = noteEtoile + "⭐"; // Ajouter l'emoji étoile
      var prixMaintenant = document.getElementById("prixMaintenant").value;
      var prixAvant = document.getElementById("prixAvant").value;
      var imageFile = document.getElementById("imageFile").files[0]; // Récupérer le fichier sélectionné
  
      // Vérifier si un fichier a été sélectionné
      if (imageFile) {
        // Créer un objet FileReader pour lire le contenu du fichier
        var reader = new FileReader();
        reader.onload = function(event) {
          var imageURL = event.target.result; // L'URL de l'image sera lue depuis le fichier sélectionné
          var product = {
            nomProduit: nomProduit,
            noteEtoile: noteEtoileAvecEmoji, // Utiliser la note avec l'emoji
            prixMaintenant: prixMaintenant,
            prixAvant: prixAvant,
            imageURL: imageURL
          };
  
          afficherProduit(product);
          savedProducts.push(product);
          localStorage.setItem("products", JSON.stringify(savedProducts));
  
          document.getElementById("popup").style.display = "none";
        };
        // Lire le contenu du fichier en tant que Data URL
        reader.readAsDataURL(imageFile);
      } else {
        // Gérer le cas où aucun fichier n'est sélectionné
        console.error("Aucun fichier sélectionné.");
      }
    });
  
    // Afficher un produit
    function afficherProduit(product) {
      var newProduct = document.createElement("div");
      newProduct.classList.add("product");
      newProduct.innerHTML = `
        <img src="${product.imageURL}" alt="${product.nomProduit}">
        <div>
          <span class="productName">${product.nomProduit}</span>
        </div>
        <div>
          <span class="productRating">${product.noteEtoile}</span>
        </div>
        <div>
          <span class="productPrice">${product.prixMaintenant}</span>
        </div>
        <div>
          <span class="productOldPrice">${product.prixAvant}</span>
        </div>
        <button class="deleteButton">Supprimer</button>
      `;
  
      productList.appendChild(newProduct);
  
      // Ajouter la logique de suppression pour les développeurs autorisés seulement
      var deleteButton = newProduct.querySelector(".deleteButton");
      if (isDeveloper()) {
        deleteButton.style.display = "block";
        deleteButton.addEventListener("click", function() {
          var index = savedProducts.indexOf(product);
          if (index !== -1) {
            savedProducts.splice(index, 1);
            localStorage.setItem("products", JSON.stringify(savedProducts));
          }
          productList.removeChild(newProduct);
        });
      }
    }
  
    // Vérifier si l'utilisateur est un développeur
    function isDeveloper() {
      return getClientIP() === developerIP;
    }
  
    // Fonction de récupération de l'adresse IP du client
    function getClientIP() {
      // Ici, vous pouvez mettre en place une logique pour récupérer l'adresse IP du client
      return "127.0.0.1"; // Par défaut, retourne l'adresse IP locale
    }
  
    // Afficher le bouton d'ajout pour les développeurs
    addButton.style.display = isDeveloper() ? "block" : "none";
    addButton.addEventListener("click", function() {
      document.getElementById("popup").style.display = "block";
    });

    // Ajouter un événement d'écoute pour le clic sur le bouton "+"
    addButton.addEventListener("click", function() {
      document.getElementById("popup").style.display = "block";
    });
});
