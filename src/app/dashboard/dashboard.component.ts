import { HttpClient } from '@angular/common/http';
import {  Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NewsletterService } from '../services/newsletter.service';
import { RessourceService } from '../services/ressource.service';
import { AnnonceService } from '../services/annonce.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Déclaration des variables
  dtOptions: DataTables.Settings = {};
  utilisateurList: any[] = [];
  annonceList: any[] = [];
  ressourceList: any[] = [];
  tabNews: any[] = [];
  loggedIn: any;
  loggedOut: any;

  userToken: any;
  userId: any;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private newsletterService: NewsletterService,
    private annonceService: AnnonceService,
    private ressourceService: RessourceService
  ) {}

  //Sidebar toggle show hide function
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  ngOnInit(): void {
    this.listerNews();
    this.userId = localStorage.getItem('userIdConnect');
    this.userToken = localStorage.getItem('userConnect');

    if (this.userToken != null) {
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

    // liste users
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

    // liste annonce
    this.annonceListe();
    // liste ressources
    this.ressourceListe();
  }

  annonceListe() {
    // liste annonce
    this.annonceService.listerAnnonces().subscribe(
      (annonce) => {
        // Afficher la liste des annonces
        console.log(annonce);
        this.annonceList = annonce.data;
        // console.log(user.data);

        console.log(this.annonceList);
      },

      (error) => {
        // Traiter l'erreur de liste
      }
    );
  }
  ressourceListe() {
    // liste annonce
    this.ressourceService.listerRessources().subscribe(
      (ressource) => {
        // Afficher la liste des annonces
        console.log(ressource);
        this.ressourceList = ressource.data;
        // console.log(user.data);

        console.log(this.ressourceList);
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

  // Fonction pour obtenir le timestamp du local storage
  isUserActive(user: any): boolean {
    const storedTimestampString = localStorage.getItem(
      `lastActivity-${user.id}`
    );
    console.log('teste', storedTimestampString);

    if (storedTimestampString === null) {
      return false;
    }

    const storedTimestamp = parseInt(storedTimestampString, 10);
    const now = Date.now();

    // Define your inactivity threshold in milliseconds (e.g., 30 minutes)
    const inactivityThreshold = 3600000;

    return now - storedTimestamp < inactivityThreshold;
  }




}
