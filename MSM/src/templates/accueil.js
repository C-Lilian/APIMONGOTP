import axios from 'axios';
import HeaderFooter from './headerFooter';

const Accueil = class {
  constructor() {
    this.el = document.querySelector('#app');
    this.headerFooter = new HeaderFooter();
    this.dataResults = [];
  }

  renderInfoEleve() {
    return `
      <section class="information-eleve-co">
        <div class="row">
          <div class="col-2 text-end">
            <img class="rounded-circle" src="../img/avatar.jpg" alt="Avatar" style="width: 100px;">
          </div>
          <div class="col-8">
            <div class="row pt-3">
              <h3>NOM PRENOM</h3>
            </div>
            <div class="row">
              <footer class="blockquote-footer">Promo - Spécialité</footer>
            </div>
          </div>
          <div class="col-2 text-start pt-4">
            <button type="button" class="btn btn-outline-warning"><i class="fa fa-pencil" aria-hidden="true"></i></button>
          </div>
        </div>
      </section>
    `;
  }

  renderMoteurRecherche() {
    return `
      <section class="moteur-recherche">
        <form action="">
          <div class="row mb-3">
            <div class="col-4">
              <div class="form-floating">
                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option selected>Tous</option>
                  <option value="1">Homme</option>
                  <option value="2">Femme</option>
                </select>
                <label for="floatingSelect">Genre</label>
              </div>
            </div>
            <div class="col-4">
              <div class="form-floating">
                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option selected>Toutes</option>
                  <option value="CDA">CDA</option>
                  <option value="CDW">CDW</option>
                </select>
                <label for="floatingSelect">Promotion</label>
              </div>
            </div>
            <div class="col-4">
              <div class="form-floating">
                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option selected>Toutes</option>
                  <option value="Dev App">Dev App</option>
                  <option value="Dev Web">Dev Web</option>
                </select>
                <label for="floatingSelect">Spécialitée</label>
              </div>
            </div>
          </div>
          <div class="row px-2 pt-1 pb-4">
            <button type="button" class="btn btn-outline-success" id="searchBtn"><i class="fa fa-search" aria-hidden="true"></i></button>
          </div>
        </form>
      </section>
    `;
  }

  renderResultSearchPerItem(item, index) {
    const {
      id,
      firstname,
      lastname,
      email,
      age,
      gender,
      promo,
      speciality
    } = item;

    return `
      <tr>
        <th scope="row">${index}</th>
        <td class="text-center"><i class="fa fa-user" aria-hidden="true"></i></td>
        <td>${lastname} ${firstname}</td>
        <td class="text-center">${age}</td>
        <td class="text-center">${gender}</td>
        <td>${email}</td>
        <td>${promo}</td>
        <td>${speciality}</td>
        <td class="text-center"><a class="link-success" href="eleve?id=${id}"><i class="fa fa-eye" aria-hidden="true"></i></a></td>
      </tr>
    `;
  }

  renderResultSearch() {
    return `
      <section class="tableau-resultat-recherche">
        <h3>Résultats de recherche :</h3>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" class="text-center">Image</th>
              <th scope="col">Nom Prénom</th>
              <th scope="col" class="text-center">Age</th>
              <th scope="col" class="text-center">Genre</th>
              <th scope="col">Email</th>
              <th scope="col">Promo</th>
              <th scope="col">Spé</th>
              <th scope="col" class="text-center">Fiche elève</th>
            </tr>
          </thead>
          <tbody id="resRecherche">
            <!-- {data.map((item, index) => this.renderResultSearchPerItem(item, index + 1)).join('')} -->
          </tbody>
        </table>
      </section>
    `;
  }

  resultsSearch() {
    const searchBtn = document.getElementById('searchBtn');

    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const lURL = 'http://localhost:3000/users/show';
      const elResRecherche = document.querySelector('#resRecherche');
      axios.get(lURL)
        .then((response) => {
          this.dataResults = response.data;
          elResRecherche.innerHTML = this.dataResults.map((item, index) => this.renderResultSearchPerItem(item, index + 1)).join('');
        }).catch((error) => {
          // handle error
          console.debug(error);
        });
    });
  }

  render() {
    return `
      ${this.headerFooter.renderHeader()}
      <main class="container py-3 mb-3" style="height: calc( 100vh - 166px ); overflow: auto;">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-10">
            ${this.renderInfoEleve()}
            <hr>
            ${this.renderMoteurRecherche()}
            ${this.renderResultSearch()}
          </div>
          <div class="col-1"></div>
        </div>
      </main>
      ${this.headerFooter.renderFooter()}
    `;
  }

  run() {
    this.el.innerHTML = this.render();
    this.resultsSearch();

    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    /* if (urlParams.has('gender') && urlParams.get('gender') != null) {
      lURL += `${lURL}&gender=${urlParams.get('gender')}`;
    } */
  }
};

export default Accueil;
