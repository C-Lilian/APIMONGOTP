import axios from 'axios';
import HeaderFooter from './headerFooter';

const Eleve = class {
  constructor() {
    this.el = document.querySelector('#app');
    this.headerFooter = new HeaderFooter();
    this.dataResults = [];
  }

  renderImgEleve() {
    return `
      <section class="img-eleve">
        <div class="row">
          <div class="col text-center">
            <img class="rounded-circle" src="../img/avatar.jpg" alt="Avatar" style="width: 125px;">
          </div>
        </div>
      </section>
    `;
  }

  renderInfoTab(item, index) {
    const {
      id,
      firstname,
      lastname,
      email,
      age,
      gender,
      promo,
      speciality,
      notations
    } = item;

    return `
      <tr id="${index}">
        <th scope="row">Nom</th>
        <td>
          <input type="text" value=${id} id="id" hidden>
          <input type="text" value="${lastname}" class="form-control" id="lastname" placeholder="name@example.com" required disabled>
        </td>
      </tr>
      <tr>
        <th scope="row">Prénom</th>
        <td>
          <input type="text" value="${firstname}" class="form-control" id="firstname" placeholder="name@example.com" required disabled>
        </td>
      </tr>
      <tr>
        <th scope="row">Email</th>
        <td>
          <input type="email" value="${email}" class="form-control" id="email" placeholder="name@example.com" required disabled>
        </td>
      </tr>
      <tr>
        <th scope="row">Age (ans)</th>
        <td>
          <input type="number" value="${age}" class="form-control" id="age" min="18" max="99" required disabled>
        </td>
      </tr>
      <tr>
        <th scope="row">Genre</th>
        <td>
          <input type="text" value="${gender}" class="form-control" id="gender" required disabled>
        </td>
      </tr>
      <tr>
        <th scope="row">Promotion</th>
        <td>
          <input type="text" value="${promo}" class="form-control" id="promo" required disabled>
        </td>
      </tr>
      <tr>
        <th scope="row">Spécialité</th>
        <td>
          <input type="text" value="${speciality}" class="form-control" id="speciality" required disabled>
        </td>
      </tr>
      <tr>
        <th scope="row">Moyenne (/20)</th>
        <td>
          ${notations || `${10} (auto)`}
        </td>
      </tr>
    `;
  }

  renderBtns() {
    return `
      <div class="row">
        <div class="col">
          <button id="btnDelete" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="fa fa-times" aria-hidden="true"></i></button>
          <button id="btnModif" type="button" class="btn btn-warning"><i class="fa fa-pencil" aria-hidden="true"></i></button>
          <button id="btnValid" type="button" class="btn btn-success"><i class="fa fa-check" aria-hidden="true"></i></button>
        </div>
      </div>
    `;
  }

  renderModal() {
    return `
      <div class="modal" id="deleteModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirmer le choix</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Êtes-vous sûr de vouloir supprimer cet élève ?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              <button type="button" class="btn btn-danger" id="btnDeleteConfirm" data-bs-dismiss="modal">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  modifEleve() {
    const btnModif = document.querySelector('#btnModif');

    btnModif.addEventListener('click', (e) => {
      e.preventDefault();

      const lastname = document.getElementById('lastname');
      const firstname = document.getElementById('firstname');
      const email = document.getElementById('email');
      const age = document.getElementById('age');
      const gender = document.getElementById('gender');
      const promo = document.getElementById('promo');
      const speciatlity = document.getElementById('speciality');

      if (lastname.disabled === true) {
        lastname.disabled = false;
        firstname.disabled = false;
        email.disabled = false;
        age.disabled = false;
        gender.disabled = false;
        promo.disabled = false;
        speciatlity.disabled = false;
      } else {
        lastname.disabled = true;
        firstname.disabled = true;
        email.disabled = true;
        age.disabled = true;
        gender.disabled = true;
        promo.disabled = true;
        speciatlity.disabled = true;
      }
    });
  }

  deleteEleve() {
    const btnDelete = document.querySelector('#btnDeleteConfirm');
    btnDelete.addEventListener('click', (e) => {
      e.preventDefault();
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const idDeleteEleve = urlParams.get('id');
      const lURL = `http://localhost:3000/user/delete/${idDeleteEleve}`;
      axios.delete(lURL)
        .then((response) => {
          console.log(response);
          window.location.replace('http://127.0.0.1:9090/accueil');
        }).catch((error) => {
          // handle error
          console.debug(error);
        });
    });
  }

  validModifEleve() {
    const btnValid = document.querySelector('#btnValid');

    btnValid.addEventListener('click', (e) => {
      e.preventDefault();
      const idEleve = document.getElementById('id').value;
      const lastname = document.getElementById('lastname').value;
      const firstname = document.getElementById('firstname').value;
      const email = document.getElementById('email').value;
      const age = document.getElementById('age').value;
      const gender = document.getElementById('gender').value;
      const promo = document.getElementById('promo').value;
      const speciatlity = document.getElementById('speciality').value;

      axios.put(`http://localhost:3000/user/update/${idEleve}`, {
        lastname,
        firstname,
        email,
        age,
        gender,
        promo,
        speciatlity
      })
        .then((response) => {
          console.log(response);
          this.run();
        }).catch((error) => {
          // handle error
          console.debug(error);
        });
    });
  }

  render(data) {
    return `
      ${this.headerFooter.renderHeader()}
      <main class="container py-3 mb-3" style="height: calc( 100vh - 166px ); overflow: auto;">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-10">
            ${this.renderImgEleve()}
            <hr>
            <section class="infos-eleve">
              <div class="row">
                <div class="col-2"></div>
                <div class="col-8 text-start">
                  <h3 class="text-start">Information sur l'élève :</h3>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col" class="text-center">Label</th>
                        <th scope="col" class="text-center">Valeur</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${this.renderInfoTab(data)}
                    </tbody>
                  </table>
                  ${this.renderBtns()}
                </div>
              </div>
            </section>
          </div>
          <div class="col-1"></div>
        </div>
        ${this.renderModal()}
      </main>
      ${this.headerFooter.renderFooter()}
    `;
  }

  run() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const lURL = `http://localhost:3000/user/show/${urlParams.get('id')}`;

    axios.get(lURL)
      .then((response) => {
        this.dataResults = response.data;
        this.el.innerHTML = this.render(this.dataResults);
        this.modifEleve();
        this.deleteEleve();
        this.validModifEleve();
      }).catch((error) => {
        // handle error
        console.debug(error);
      });
  }
};

export default Eleve;
