import { CommentaireService } from './../../services/commentaire.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { BienService } from 'src/app/services/bien.service';
import { RessourceService } from 'src/app/services/ressource.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-gestion-commentaire',
  templateUrl: './gestion-commentaire.component.html',
  styleUrls: ['./gestion-commentaire.component.css'],
})
export class GestionCommentaireComponent implements OnInit {
  utilisateurList: any[] = [];
  annonceList: any[] = [];
  ressourceList: any[] = [];
  listCommentaire: any[] = [];
  dtOptions: DataTables.Settings = {};
  //Sidebar toggle show hide function
  status = false;
  addToggle() {
    this.status = !this.status;
  }
  constructor(
    private http: HttpClient,
    private bienService: BienService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private annonceService: AnnonceService,
    private ressourceService: RessourceService,
    private commentaireService: CommentaireService
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
    this.annonceListe();
    this.ressourceListe();
    this.getAllComments();
  }

  // liste commentaires
  getAllComments() {
    // liste commmentaire
    this.commentaireService.getAllNewsletter().subscribe(
      (commentaires) => {
        // Afficher la liste des annonces
        console.log(commentaires);
        this.listCommentaire = commentaires.data;
        console.log(this.listCommentaire);
        // Filtrer les commentaires pour ne récupérer que ceux liés à l'annonce sélectionnée
        // this.commentAnnonce = this.listCommentaire.filter(
        //   (comment) => parseInt(comment.annonce_id) === this.idAnnonce
        // );

        // console.log('comments of annonce: ', this.commentAnnonce);
      },

      (error) => {
        // Traiter l'erreur de liste
      }
    );
  }
  commentaireSelectionner:any={};
  getCommentaire(commentaire: any) {
    this.commentaireSelectionner = commentaire;
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
