// Ajouter un film
function ajouter() {
    const titre = document.getElementById('nomfilm').value;
    const realisateur = document.getElementById('nomrealis').value;
    const dateDEsortie = document.getElementById('datesor').value;
    const genre = document.getElementById('genre').value;
    const statue = document.getElementById('statue').value;
    const image = document.getElementById('filmimg').value;

    const film = {
        titre: titre,
        realisateur: realisateur,
        dateDEsortie: dateDEsortie,
        genre: genre,
        statue: statue,
        image: image
    };

    let films = JSON.parse(localStorage.getItem('films')) || [];
    films.push(film);
    localStorage.setItem('films', JSON.stringify(films));

    ajouterCarte(film);
    clearForm();
}

// Ajouter une carte de film à la liste
function ajouterCarte(film) {
    const malist = document.createElement('li');
    const card = document.createElement('div');
    card.className = 'container';
    card.innerHTML = `
    <div class="card-body" id="aa">
      <img src="${film.image}" style="width: 300px; height: 200px;">
      <h3 style="text-align: center">${film.titre}</h3>
      <h4>${film.realisateur}</h4>
      <div class="row">
          <div class="col md-5">
             <h5 id="h5">${film.genre}</h5>
          </div>
          <div class="col md-5">
             <h5>${film.dateDEsortie}</h5>
          </div>
          <div class="col md-5">
             <h5 id="h5">${film.statue}</h5>
          </div>
       </div>
       <button class="btn-modifier">Modifier</button>
       <button class="btn-supprimer">Supprimer</button>
    </div>
    `;
    malist.appendChild(card);
    document.getElementById('list').appendChild(malist);

    card.querySelector('.btn-modifier').addEventListener('click', () => modifierCarte(film, malist));
    card.querySelector('.btn-supprimer').addEventListener('click', () => supprimerCarte(film, malist));
}

// Réinitialiser le formulaire
function clearForm() {
    document.getElementById('nomfilm').value = '';
    document.getElementById('nomrealis').value = '';
    document.getElementById('datesor').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('statue').value = '';
    document.getElementById('filmimg').value = ''; 
}

// Supprimer une carte de film
function supprimerCarte(film, malist) {
    let films = JSON.parse(localStorage.getItem('films')) || [];
    films = films.filter(f => f.titre !== film.titre);
    localStorage.setItem('films', JSON.stringify(films));

    document.getElementById('list').removeChild(malist);
}

// Charger les films depuis le localStorage au démarrage
window.onload = function() {
    let films = JSON.parse(localStorage.getItem('films')) || [];
    films.forEach(film => ajouterCarte(film));
}

// Modifier une carte de film
function modifierCarte(film, malist) {
    document.getElementById('nomfilm').value = film.titre;
    document.getElementById('nomrealis').value = film.realisateur;
    document.getElementById('datesor').value = film.dateDEsortie;
    document.getElementById('genre').value = film.genre;
    document.getElementById('statue').value = film.statue;
    document.getElementById('filmimg').value = film.image;

    // Supprimer l'ancien élément de la liste
    document.getElementById('list').removeChild(malist);

    // Mettre à jour le bouton "Ajouter" pour qu'il devienne "Mettre à jour"
    let boutonAjouter = document.getElementById('btnn');
    boutonAjouter.textContent = 'Mettre à jour';

    // Changer la fonction onclick pour appeler la fonction mettreAJour au lieu de ajouter
    boutonAjouter.onclick = function() {
        mettreAJour(film.titre);
    };
}

// Mettre à jour un film
function mettreAJour(titreOriginal) {
    const titre = document.getElementById('nomfilm').value;
    const realisateur = document.getElementById('nomrealis').value;
    const dateDEsortie = document.getElementById('datesor').value;
    const genre = document.getElementById('genre').value;
    const statue = document.getElementById('statue').value;
    const image = document.getElementById('filmimg').value;

    const filmModifie = {
        titre: titre,
        realisateur: realisateur,
        dateDEsortie: dateDEsortie,
        genre: genre,
        statue: statue,
        image: image
    };

    let films = JSON.parse(localStorage.getItem('films')) || [];
    films = films.map(f => f.titre === titreOriginal ? filmModifie : f);
    localStorage.setItem('films', JSON.stringify(films));

    ajouterCarte(filmModifie);
    clearForm();

    // Restaurer le bouton à son état initial
    let boutonAjouter = document.getElementById('btnn');
    boutonAjouter.textContent = 'Ajouter';
    boutonAjouter.onclick = ajouter;
}