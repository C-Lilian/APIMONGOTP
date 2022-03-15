const HeaderFooter = class {
  renderHeaderTop() {
    return `
      <header style="background-color: #1E6F5C; height: 65px;">
        <div class="container text-center">
          <img src="img/logo_MSM_noBg.png" alt="Logo My School Manager" style="width: 75px;">
        </div>
      </header>
    `;
  }

  renderHeaderBottom() {
    return `
      <header style="background-color: #29BB89; height: 35px;">
        <div class="container text-center pt-1">
          <div class="row">
            <div class="col-2"></div>
            <div class="col-8 d-flex justify-content-evenly">
              <a href="accueil" class="link-light">Accueil</a>
              <a href="classes" class="link-light">Classes</a>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  renderHeader() {
    return `
      <section id="headers">
        ${this.renderHeaderTop()}
        ${this.renderHeaderBottom()}
      </section>
    `;
  }

  renderFooter() {
    return `
      <footer class="p-2 mt-1" style="background-color: #343434; height: 50px;">
        <div class="container text-center">
          <p style="color: #FFFFFF;">© MSM - 2022</p>
        </div>
      </footer>
    `;
  }
};

export default HeaderFooter;
