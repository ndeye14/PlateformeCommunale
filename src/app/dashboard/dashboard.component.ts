import { HttpClient } from '@angular/common/http';
import {  Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NewsletterService } from '../services/newsletter.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Déclaration des variables
  dtOptions: DataTables.Settings = {};
  utilisateurList: any[] = [];
  tabNews: any[] = [];
  loggedIn: any;
  loggedOut: any;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private newsletterService: NewsletterService
  ) {}

  //Sidebar toggle show hide function
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  ngOnInit(): void {
    this.listerNews();

    if (localStorage.getItem('userConnect.user.id') != null) {
      this.loggedIn = true;
      this.loggedOut = false;
    } else {
      this.loggedIn = false;
      this.loggedOut = true;
    }

    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength: 5,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      },
    };

    // liste annonce
    this.userService.listerUtilisateurs().subscribe(
      (user) => {
        // Afficher la liste des annonces
        console.log(user);
        this.utilisateurList = user.data;
        // console.log(user.data);

        console.log(this.utilisateurList);
      },

      (error) => {
        // Traiter l'erreur de liste
      }
    );
  }

  logout(): void {
    this.userService.logout().subscribe(
      () => {
        this.userService.logout().subscribe((data) => {
          console.log(data);
        });
        // Supprimez le token du stockage local
        localStorage.removeItem('userConnect');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erreur lors de la déconnexion:', error);
      }
    );
  }

  listerNews() {
    this.newsletterService.getAllNewsletter().subscribe(
      (news) => {
        this.tabNews = news.data;
        console.log(this.tabNews);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // inscrire newsletter

}
