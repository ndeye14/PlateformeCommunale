import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-authen',
  templateUrl: './authen.component.html',
  styleUrls: ['./authen.component.css']
})
export class AuthenComponent {
  showForm1: boolean = true; // Affiche le premier formulaire par défaut
  titleFrm: string = "Inscrivez-vous";
  errorMessage: any;

  constructor(private authService: UserService, private router: Router) { }



  // Méthode pour changer la valeur de showForm1
  toggleForm() {
    this.showForm1 = !this.showForm1;

    // OpÃ©ration ternaire qui prend la premiere valeur aprÃ¨s le ? si la condition est vrai
    // ou la deuxiÃ¨me aprÃ¨s les : si la condition est fausse
    this.showForm1 == false ? this.titleFrm = "Connectez-Vous" : this.titleFrm = "Inscrivez-Vous";

  }

  email!: string;
  password!: string;

  //   onSubmit() {
  //   // Récupérer les valeurs des champs du formulaire
  //   const email = this.email;
  //   const password = this.password;

  //   // Envoyer les données du formulaire au serveur
  //   this.authService.login(email, password).subscribe(() => {
  //     // La connexion a réussi
  //     this.router.navigate(['/home']);
  //   }, (error) => {
  //     // La connexion a échoué
  //     this.errorMessage = error.message;
  //   });
  // }


  // }
}
