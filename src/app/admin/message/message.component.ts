import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { MessageService } from 'src/app/services/message.service';
import { RessourceService } from 'src/app/services/ressource.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  messageList: any[] = [];
  utilisateurList: any[] = [];
  annonceList: any[] = [];
  ressourceList: any[] = [];
  messageSelectionner: any = {};
  // variable
  nom!: string;
  email!: string;
  message!: string;
  //Sidebar toggle show hide function
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  constructor(
    public messageService: MessageService,
    private userService: UserService,
    private router: Router,
    private annonceService: AnnonceService,
    private ressourceService: RessourceService
  ) {}

  ngOnInit(): void {
    //datatable
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

    // liste messages
    this.messageService.getAllMessage().subscribe(
      (message) => {
        // Afficher la liste des messages
        console.log(message);
        this.messageList = message.data;
        console.log(this.messageList);
      },

      (error) => {
        // Traiter l'erreur de liste
      }
    );
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

  // pour recuperer un message
  getMessage(message: any) {
    this.messageSelectionner = message;
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
}
