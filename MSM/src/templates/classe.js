import HeaderFooter from './headerFooter';

const Classe = class {
  constructor() {
    this.el = document.querySelector('#app');
    this.headerFooter = new HeaderFooter();
  }

  renderInfoClasse() {
    return `
      <section class="info-classe">
        <div class="row">
          <div class="col text-center">
            <div class="row pt-3">
              <h3>NOM CLASSE</h3>
            </div>
            <div class="row">
              <footer class="blockquote-footer">Promo - Spécialité</footer>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderAllEleve() {
    return `
      <section class="tableau-resultat-recherche">
        <h3>Elèves de la classe :</h3>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" class="text-center">Image</th>
              <th scope="col">Nom Prénom</th>
              <th scope="col" class="text-center">Age</th>
              <th scope="col" class="text-center">Genre</th>
              <th scope="col">Email</th>
              <th scope="col">Fiche élève</th>
            </tr>
          </thead>
          <tbody>
            ${this.renderItemEleve()}
            ${this.renderItemEleve()}
            ${this.renderItemEleve()}
            ${this.renderItemEleve()}
            ${this.renderItemEleve()}
            ${this.renderItemEleve()}
          </tbody>
        </table>
      </section>
    `;
  }

  renderItemEleve() {
    return `
      <tr>
        <th scope="row">1</th>
        <td class="text-center"><i class="fa fa-user" aria-hidden="true"></i></td>
        <td>Cleret Lilian</td>
        <td class="text-center">20</td>
        <td class="text-center">H</td>
        <td>lilian.cleret@gmail.com</td>
        <td class="text-center"><a class="link-success" href="eleve"><i class="fa fa-eye" aria-hidden="true"></i></a></td>
      </tr>
    `;
  }

  render() {
    return `
      ${this.headerFooter.renderHeader()}
      <main class="container py-3 mb-3" style="height: calc( 100vh - 166px ); overflow: auto;">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-10">
            ${this.renderInfoClasse()}
            <hr>
            ${this.renderAllEleve()}
          </div>
          <div class="col-1"></div>
        </div>
      </main>
      ${this.headerFooter.renderFooter()}
    `;
  }

  run() {
    this.el.innerHTML = this.render();
  }
};

export default Classe;
