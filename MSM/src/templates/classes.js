import HeaderFooter from './headerFooter';

const Classes = class {
  constructor() {
    this.el = document.querySelector('#app');
    this.headerFooter = new HeaderFooter();
  }

  renderClasseItem() {
    return `
      <div class="card m-2" style="width: 15rem; border-color: #29BB89;">
        <div class="card-body">
          <h5 class="card-title">CDA 2020</h5>
          <h6 class="card-subtitle mb-2 text-muted">CDA - Dev App</h6>
          <p class="card-text">16 élèves</p>
          <a href="classe" class="card-link link-success">Accéder à la classe</a>
        </div>
      </div>
    `;
  }

  render() {
    return `
    ${this.headerFooter.renderHeader()}
    <main class="container py-3 mb-3" style="height: calc( 100vh - 166px ); overflow: auto;">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-10">
          <section class="liste-classes">
            <div class="row">
              <div class="col-1"></div>
              <div class="col-10 text-start">
                <h3 class="text-start py-3">Ensemble des classes :</h3>
                <div class="row d-flex justify-content-evenly align-items-start">
                  ${this.renderClasseItem()}
                  ${this.renderClasseItem()}
                  ${this.renderClasseItem()}
                  ${this.renderClasseItem()}
                  ${this.renderClasseItem()}
                </div>
              </div>
            </div>
          </section>
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

export default Classes;
