import ConnexionPage from './templates/connexion';
import AccueilPage from './templates/accueil';
import ClassesPage from './templates/classes';
import ClassePage from './templates/classe';
import ElevePage from './templates/eleve';

import './index.scss';

const Controller = class {
  routes() {
    const urlPath = window.location.pathname.split('/');

    if (urlPath[1] === 'accueil') {
      const accueil = new AccueilPage();
      accueil.run();
      return;
    }

    if (urlPath[1] === 'classes') {
      const classes = new ClassesPage();
      classes.run();
      return;
    }

    if (urlPath[1] === 'classe') {
      const classe = new ClassePage();
      classe.run();
      return;
    }

    if (urlPath[1] === 'eleve') {
      const eleve = new ElevePage();
      eleve.run();
      return;
    }

    if (!urlPath[1] || urlPath[1] === 'connexion') {
      document.body.style.backgroundColor = '#1E6F5C';
      const connexion = new ConnexionPage();
      connexion.run();
    } /* else {
      const errorPage = new ErrorPage();

      errorPage.run();
    } */
  }

  run() {
    this.routes();
  }
};

const controller = new Controller();

controller.run();
