import axios from 'axios';
import '../js/jsPage';

const Connexion = class {
  constructor() {
    this.el = document.querySelector('#app');
  }

  renderConnexionSection() {
    return `
      <section class="connexion-section" id="connexion-section" hidden>
        <hr>
        <h3 class="py-1" style="font-family: 'League Spartan', sans-serif; color: #343434; padding: -20px;">- Se connecter -</h3>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="floatingPassword">
          <label for="floatingPassword">Password</label>
        </div>
        <div class=""><button class="w-100 btn btn-lg btn" style="background-color: #1E6F5C; color: #FFFFFF;" type="submit">Connexion</button></div>
      </section>
    `;
  }

  renderInscriptionSection() {
    return `
      <section class="inscription-section" id="inscription-section" hidden>
        <hr>
        <h3 class="py-1" style="font-family: 'League Spartan', sans-serif; color: #343434; padding: -20px;">- S'inscrire -</h3>
        <div class="row">
          <div class="col-6">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="lastname" placeholder="LastName" required>
              <label for="floatingInput">Nom</label>
            </div>
          </div>
          <div class="col-6">
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="firstname" placeholder="FirstName" required>
              <label for="floatingInput">Prénom</label>
            </div>
          </div>
        </div>
        
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="email" placeholder="name@example.com" required>
          <label for="floatingInput">Email address</label>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="form-floating mb-3">
              <input type="number" class="form-control" id="age" placeholder="18" min="18" max="99" required>
              <label for="floatingInput">Age</label>
            </div>
          </div>
          <div class="col-6">
            <div class="form-floating mb-3">
              <select class="form-select" id="gender" aria-label="Floating label select example" required>
                <option value="">Sélectionner un genre</option>
                <option value="H">Homme</option>
                <option value="F">Femme</option>
              </select>
              <label for="floatingSelect">Genre</label>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="form-floating mb-3">
              <select class="form-select" id="promo" aria-label="Floating label select example" required>
                <option value="">Sélectionner un Promo</option>
                <option value="CDA">CDA</option>
                <option value="CDW">CDW</option>
              </select>
              <label for="floatingSelect">Promo</label>
            </div>
          </div>
          <!-- Mettre un onchange sur le select d'avant qui va venir recharger la liste d'à côté. -->
          <div class="col-6">
            <div class="form-floating mb-3">
              <select class="form-select" id="speciality" aria-label="Floating label select example" required>
                <option value="">Sélectionner une spécialité</option>
                <option value="Dev Web">Dev Web</option>
                <option value="Dev App">Dev App</option>
              </select>
              <label for="floatingSelect">Spécialité</label>
            </div>
          </div>
        </div>

        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="password" placeholder="Password" required>
          <label for="floatingPassword">Password</label>
        </div>

        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="confirmedpassword" placeholder="Password" required>
          <label for="floatingPassword">Confirm password</label>
        </div>
        <div class=""><button id="buttonInsc" class="w-100 btn btn-lg btn" style="background-color: #1E6F5C; color: #FFFFFF;" type="submit">Inscription</button></div>
      </section>
    `;
  }

  renderTopConnexion() {
    return `
      <div class="text-center">
        <img class="" src="img/logo_MSM.png" alt="Logo My School Manager" style="width: 20%;">
      </div>
      <h2 class="" style="font-family: 'League Spartan', sans-serif; color: #343434; padding: -20px;">BIENVENUE</h2>
      <hr>
      <section class="boutons-section">
        <div class="row m-2">
          <div class="col-6 pe-4"><button id="btnDivInsc" class="w-100 btn btn-lg btn" style="background-color: #1E6F5C;color: #FFFFFF;" type="submit">S'inscrire</button></div>
          <div class="col-6 ps-4"><button id="btnDivConn" class="w-100 btn btn-lg btn" style="background-color: #1E6F5C; color: #FFFFFF;" type="submit">Se connecter</button></div>
        </div>
      </section>
    `;
  }

  divConnInsc() {
    const buttonDivInsc = document.querySelector('#btnDivInsc');
    const buttonDivConn = document.querySelector('#btnDivConn');

    buttonDivInsc.addEventListener('click', (e) => {
      e.preventDefault();
      if (document.getElementById('inscription-section').hidden === false) {
        document.getElementById('inscription-section').hidden = true;
      } else {
        document.getElementById('inscription-section').hidden = false;
      }
      document.getElementById('connexion-section').hidden = true;
      this.connInsc();
    });
    buttonDivConn.addEventListener('click', (e) => {
      e.preventDefault();
      if (document.getElementById('connexion-section').hidden === false) {
        document.getElementById('connexion-section').hidden = true;
      } else {
        document.getElementById('connexion-section').hidden = false;
      }
      document.getElementById('inscription-section').hidden = true;
    });
  }

  connInsc() {
    const buttonInsc = document.querySelector('#buttonInsc');
    buttonInsc.addEventListener('click', (e) => {
      e.preventDefault();

      const firstname = document.getElementById('firstname').value;
      const lastname = document.getElementById('lastname').value;
      const email = document.getElementById('email').value;
      const age = document.getElementById('age').value;
      const gender = document.getElementById('gender').value;
      const promo = document.getElementById('promo').value;
      const speciality = document.getElementById('speciality').value;
      const password = document.getElementById('password').value;

      axios.post('http://localhost:3000/user', {
        firstname,
        lastname,
        email,
        age,
        gender,
        promo,
        speciality,
        password
      }).then((response) => {
        console.log(response);
        /* axios.post('http://127.0.0.1:9090/accueil', {
          email,
          password
        }).then((response2) => {
          console.log(response2);
        }).catch((error) => {
          console.log(error);
        }); */
        // window.location.replace('http://127.0.0.1:9090/accueil');
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  render() {
    return `
    <div class="text-center" style="background-color: #1E6F5C; style="height: calc( 250vh ); overflow: auto;">
      <div class="container p-5">
        <div class="row p-5">
          <div class="col-2"></div>
          <div class="col-8 p-5">
            <div class="row p-3 g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" style="background-color: #FFFFFF;">
              <div class="col p-4 d-flex flex-column position-static">
                ${this.renderTopConnexion()}
                ${this.renderConnexionSection()}
                ${this.renderInscriptionSection()}
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <p>© MSM - 2022</p>
        </div>
      </div>
    </div>
    `;
  }

  run() {
    this.el.innerHTML = this.render();
    // Add eventlistener
    this.divConnInsc();
    // this.connInsc();
  }
};

export default Connexion;
