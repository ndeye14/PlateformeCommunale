import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //
  isPasswordVisible: boolean = false;
  // Déclaration des variables
  isConnexion: boolean = true;
  passwordMod: any;

  showForm1: boolean = true; // Affiche le premier formulaire par défaut
  titleFrm: string = 'Connectez-Vous';
  // Variable pour les inputs inscription
  email: string = '';
  password: string = '';
  nom: any = '';
  prenom: any = '';
  role: string = 'user';
  errorMessage: any;
  passwordConf: string = '';
  // pour la connexion
  emailCon: string = '';
  passwordCon: string = '';

  // Variables pour faire la vÃ©rifications
  verifNom: String = '';
  verifPrenom: String = '';
  verifEmail: String = '';
  verifPassword: String = '';
  verifPasswordConf: String = '';

  // Variables si les champs sont exacts
  exactNom: boolean = false;
  exactPrenom: boolean = false;
  exactEmail: boolean = false;
  exactPassword: boolean = false;
  exactPasswordConf: boolean = false;

  // Pour vÃ©rifier les champs pour la connexion
  verifEmailCon: String = '';
  verifPasswordCon: String = '';

  // Variables Si les valeurs sont exactes
  exactEmailCon: boolean = false;
  exactPasswordCon: boolean = false;
  userId: any;
  // Fonction pour obtenir le timestamp actuel
  getTimestamp = (): number => {
    return Date.now();
  };

  // Exemple d'utilisation
  timestamp = this.getTimestamp();
  loggedIn: any;
  loggedOut: any;

  constructor(private authService: UserService, private route: Router) {}
  ngOnInit(): void {
    if (localStorage.getItem('userConnect') != null) {
      this.loggedIn = true;
      this.loggedOut = false;
    } else {
      this.loggedIn = false;
      this.loggedOut = true;
    }
    this.userId = localStorage.getItem('userIdConnect');
    // Stockez le timestamp avec l'ID de l'utilisateur
    localStorage.setItem(
      `lastActivity-${this.userId}`,
      this.timestamp.toString()
    );
  }

  // Méthode pour changer la valeur de showForm1
  toggleForm() {
    this.showForm1 = !this.showForm1;

    // OpÃ©ration ternaire qui prend la premiere valeur aprÃ¨s le ? si la condition est vrai
    // ou la deuxiÃ¨me aprÃ¨s les : si la condition est fausse
    this.showForm1 == false
      ? (this.titleFrm = 'Inscrivez-Vous')
      : (this.titleFrm = 'Connectez-Vous');
  }

  // validateEmail(email: string): boolean {
  //   const emailRegex =
  //     /^[A-Za-z]+[A-Za-z0-9\._%+-]+@[A-Za-z][A-Za-z0-9\.-]+\.[A-Za-z]{2,}$/;
  //   return emailRegex.test(email);
  // }

  // Fonction de Verification du password pour la fonctionnalitÃ© connexion
  verifPasswordConFonction() {
    const regex = /\s+/;
    this.exactPasswordCon = false;
    if (this.passwordCon == '') {
      this.verifPasswordCon = '';
      // this.verifPasswordCon = 'Veuillez renseigner votre mot de passe';
    } else if (this.passwordCon.match(regex)) {
      this.verifPasswordCon = "Mot de passe ne doit pas  contenir d'espace ";
    } else if (this.passwordCon.length < 5) {
      this.verifPasswordCon = 'Mot de passe doit etre superieur à 5 caracteres';
    } else {
      this.verifPasswordCon = '';
      this.exactPasswordCon = true;
    }
  }
  // Fonction de Verification de l'email pour la fonctionnalitÃ© connexion
  verifEmailConFonction() {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    this.exactEmailCon = false;

    if (this.emailCon == '') {
      // this.verifEmailCon = 'Veuillez renseigner votre email';
      this.verifEmailCon = '';
    } else if (
      !this.emailCon.match(emailPattern) ||
      this.emailCon.endsWith('@') ||
      !this.emailCon.includes('.')
    ) {
      this.verifEmailCon = 'Veuillez donner un email valide';
    } else {
      this.verifEmailCon = '';
      this.exactEmailCon = true;
    }
  }
  // Verification du nom
  NomPattern1 = /^[a-zA-Z ]+$/;
  verifNomFonction() {
    this.exactNom = false;
    if (this.nom == '') {
      this.verifNom = '';
      // this.verifNom = 'Veuillez renseigner votre nom';
    } else if (!isNaN(this.nom)) {
      this.verifNom = 'Le nom ne doit pas etre des numeriques';
    } else if (this.nom.length < 2) {
      this.verifNom = 'Le nom est trop court';
    } else if (!this.nom.match(this.NomPattern1)) {
      this.verifNom = 'Donner un nom valide';
    } else {
      this.verifNom = '';
      this.exactNom = true;
    }
  }

  // Verification du prenom
  verifPrenomFonction() {
    this.exactPrenom = false;
    if (this.prenom == '') {
      this.verifPrenom = '';
      // this.verifPrenom = 'Veuillez renseigner votre prenom';
    } else if (!isNaN(this.prenom)) {
      this.verifPrenom = 'Le prenom ne doit pas etre des numeriques';
    } else if (this.prenom.length < 3) {
      this.verifPrenom = 'Le prenom est trop court';
    } else if (!this.prenom.match(this.NomPattern1)) {
      this.verifPrenom = 'Donner un prenom valide';
    } else {
      this.verifPrenom = '';
      this.exactPrenom = true;
    }
  }

  // Verification de  l'email
  verifEmailFonction() {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    this.exactEmail = false;

    if (this.email == '') {
      this.verifEmail = '';
      // this.verifEmail = 'Veuillez renseigner votre email';
    } else if (!this.email.match(emailPattern)) {
      this.verifEmail = 'Veuillez donner un email valide';
    } else {
      this.verifEmail = '';
      this.exactEmail = true;
    }
  }
  // Verification du mot de passe
  verifPasswordFonction() {
    const regex = /\s+/;
    this.exactPassword = false;
    if (this.password == '') {
      this.verifPassword = '';
      // this.verifPassword = 'Veuillez renseigner votre mot de passe';
    } else if (this.password.match(regex)) {
      this.verifPassword = 'Mot de passe ne doit pas  contenir d espace ';
    } else if (this.password.length < 5) {
      this.verifPassword =
        'Mot de passe doit superierur ou egal a  5 caracteres';
    } else {
      this.verifPassword = '';
      this.exactPassword = true;
    }
  }

  // Verification du mot de passe confirmÃ©
  verifPasswordConfFonction() {
    this.exactPasswordConf = false;
    if (this.passwordConf == '') {
      this.verifPasswordConf = '';
      // this.verifPasswordConf =
      // 'Veuillez renseigner a  nouveau votre mot de passe';
    } else if (this.password != this.passwordConf) {
      this.verifPasswordConf = 'Les deux mots de passe ne sont pas conformes';
    } else {
      this.verifPasswordConf = '';
      this.exactPasswordConf = true;
    }
  }

  login() {
    console.log(this.emailCon, this.passwordCon);
    if (this.emailCon == '' || this.passwordCon == '') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '',
        text: 'Veillez remplir les champs',
        showConfirmButton: true,
      });
    } else if (this.emailCon.endsWith('@') || !this.emailCon.includes('.')) {
      // Vérifie si l'email se termine juste par @
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '',
        text: 'Veillez saissir un email valide',
        showConfirmButton: true,
      });
    } else {
      let user = {
        email: this.emailCon,
        password: this.passwordCon,
      };

      let response: any;
      this.authService.login(user).subscribe(
        (rep) => {
          response = rep;
          console.log(response);
          console.log(response.user.role);
          if (response.user.role == 'admin') {
            // console.log ("C'est bon");
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '',
              text: 'connexion reussi',
              showConfirmButton: false,
              timer: 1500,
            });
            this.notifyTokenExpiration();
            this.route.navigate(['/dash']); // Redirection vers le dashbord concerné

            // On stocke les info de la requete dans notre localstorage
            localStorage.setItem('userConnect', response.token);
            // On stocke les info de la requete dans notre localstorage
            localStorage.setItem('userIdConnect', response.user.id);
          } else if (response.user.role == 'user') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '',
              text: 'connexion reussi',
              showConfirmButton: false,
              timer: 1500,
            });
            this.notifyTokenExpiration();

            this.route.navigate(['/acceuil']); // Redirection vers l accueil
            // this.authService.isAuthenticated = true; // Définit la variable isAuthicated à true pour la guard

            // On stocke le token requete dans notre localstorage
            localStorage.setItem('userConnect', response.token);
            // On stocke les info de la requete dans notre localstorage
            localStorage.setItem('userIdConnect', response.user.id);

            // this.iscorrectValues = true; //Les données fournies sont correctes
          } else {
            console.log("L'adresse email est incorrecte");
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '',
              text: 'Veillez saissir un email valide',
              showConfirmButton: true,
            });
          }
        },
        (error) => {
          // this.iscorrectValues = false;
          console.log(error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '',
            text: 'Les informations sont incorrectes',
            showConfirmButton: true,
          });
        }
      );
    }
  }

  register() {
    // On fait appel au mÃ©thode qui permettent de vÃ©rifier les champs
    this.verifEmailFonction();
    this.verifNomFonction();
    this.verifPrenomFonction();
    this.verifPasswordFonction();
    this.verifPasswordConfFonction();
    console.log(this.nom, this.prenom, this.email, this.password, this.role);
    let user = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
      role: this.role,
    };
    let respons: any;
    this.authService.register(user).subscribe((rep) => {
      respons = rep;
      console.log(respons);
      if (respons.status_code == 200) {
        this.showForm1 = true; //redirige directement vers la connexion apres inscription
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '',
          text: 'deconnexion reussi',
          showConfirmButton: false,
          timer: 1500,
        });
        // alert("gfrthyu")
        // this.route.navigate(['/login']);
      }
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  notifyTokenExpiration() {
    // Définir le délai de notification (1h en millisecondes)
    const notificationDelay = 3600000;

    // Fonction pour afficher la notification
    const showNotification = () => {
      // Affichage d'une notification visuelle et/ou sonore
      // Exemple : toast, notification native du navigateur, etc.
      alert("Votre token est sur le point d'expirer ! Veuillez vous reconnecter.");

      this.route.navigate(['/login']);
    };

    // Définir un intervalle pour répéter la notification
    setInterval(showNotification, notificationDelay);
  }


}









