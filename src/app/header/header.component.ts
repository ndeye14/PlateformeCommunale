import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  loggedIn: any;
  loggedOut: any;
  constructor(private authService: UserService, private route: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('userConnect') != null) {
      this.loggedIn = true;
      this.loggedOut = false;
    } else {
      this.loggedIn = false;
      this.loggedOut = true;
    }


  }
  logout(): void {

        this.authService.logout().subscribe((data) => {
          console.log(data);
        });
        // Supprimez le token du stockage local
        localStorage.removeItem('userConnect');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '',
          text: 'deconnexion reussi',
          timer: 1500,
        });
        this.ngOnInit();

        this.route.navigate(['/acceuil']);

     
  }

  redirect() {
    if (this.loggedIn) {
      this.route.navigate(['/bien'])
    } else {
     Swal.fire({
       position: 'center',
       icon: 'success',
       title: '',
       text: 'Connectez vous pour avoir accces a cet espace',
       showConfirmButton: true,
     });

    }
  }
}
