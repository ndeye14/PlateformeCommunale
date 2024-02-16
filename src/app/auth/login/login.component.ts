import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/User.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Déclaration des variables
  isConnexion: boolean = true;
  passwordMod:any;
  // isRein1: boolean = false;
  // isRein2: boolean = false;

  showForm1: boolean = true; // Affiche le premier formulaire par défaut
  titleFrm: string = 'Connectez-Vous';
  // Variable pour les inputs
  email: string = '';
  password: string = '';
  nom: string = '';
  prenom: string = '';
  role: string = 'user';
  errorMessage: any;

  constructor(private authService: UserService, private route: Router) {}
  ngOnInit(): void {}

  // Méthode pour changer la valeur de showForm1
  toggleForm() {
    this.showForm1 = !this.showForm1;

    // OpÃ©ration ternaire qui prend la premiere valeur aprÃ¨s le ? si la condition est vrai
    // ou la deuxiÃ¨me aprÃ¨s les : si la condition est fausse
    this.showForm1 == false
      ? (this.titleFrm = 'Inscrivez-Vous')
      : (this.titleFrm = 'Connectez-Vous');
  }

  // onSubmit() {
  //    let user = {
  //      email: this.email,
  //      password: this.password,
  //    };
  // //   // Envoyer les données du formulaire au serveur
  //    let response: any;
  //     this.authService.login(user).subscribe(
  //       (rep) => {
  //         response = rep;
  //         console.log(response);
  //         if (response.status) {
  //           // console.log ("C'est bon");

  //           this.route.navigate(['acceuil']); // Redirection vers le dashbord concerné
  //           // this.authService.isAuthenticated = true; // Définit la variable isAuthicated à true pour la guard

  //           // On stocke les info de la requete dans notre localstorage
  //           // localStorage.setItem('userConnect', JSON.stringify(response));

  //           // this.iscorrectValues = true; //Les données fournies sont correctes
  //         }
  //       },

  //     );
  // //   this.authService.login(this.email, this.password).subscribe({
  // //     next: (resp) => {
  // //       console.log('Connexion réussie !', resp);
  // //       // Redirection vers la page d'accueil
  // //       // this.route.navigate(['acceuil']);
  // //     },
  // //     error: (error) => {
  // //       // Gestion des erreurs
  // //       this.errorMessage = error.message;
  // //       if (error.status === 200) {
  // //         this.errorMessage = 'Identifiants incorrects.';
  // //       } else {
  // //         this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
  // //       }
  // //     },
  // //   });
  // }

  // Methode de connexion
  login() {
    console.log(this.email, this.password);
    if (this.email == '' || this.password == '') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '',
        text: 'Veillez remplir les champs',
        showConfirmButton: true,
      });
    } else if (this.email.endsWith('@') || !this.email.includes('.')) {
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
        email: this.email,
        password: this.password,
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
              showConfirmButton: true,
              timer:1500,
            });

            this.route.navigate(['/dash']); // Redirection vers le dashbord concerné
            // this.authService.isAuthenticated = true; // Définit la variable isAuthicated à true pour la guard

            // On stocke les info de la requete dans notre localstorage
            localStorage.setItem('userConnect', response.token);

            // this.iscorrectValues = true; //Les données fournies sont correctes
          } else if (response.user.role == 'user') {
            // console.log ("C'est bon");
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '',
              text: 'connexion reussi',
              showConfirmButton: true,
              timer:1500,
            });

            this.route.navigate(['/acceuil']); // Redirection vers l accueil
            // this.authService.isAuthenticated = true; // Définit la variable isAuthicated à true pour la guard

            // On stocke les info de la requete dans notre localstorage
            localStorage.setItem('userConnect', response.token);

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
        this.showForm1 = true;
        // alert("gfrthyu")
        // this.route.navigate(['/login']);
      }
    });
  }

  moficPassword() {
    // this.authService.modifPassword().subscribe((rep) => {});

  }
}









