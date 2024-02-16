import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BienService } from '../services/bien.service';
import { AnnonceService } from '../services/annonce.service';
import { UserService } from '../services/user.service';
import { RessourceService } from '../services/ressource.service';
import { CommentaireService } from '../services/commentaire.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css'],
})
export class AcceuilComponent implements OnInit {
  // sousTableau = tableau.slice(debut, fin);
  annonceList: any[] = [];
  ressourceList: any[] = [];
  annonceSelectionner: any = {};
  bienList: any[] = [];
  description: any;
  listCommentaire: any[] = [];
  commentAnnonce: any;
  constructor(
    private http: HttpClient,
    private bienService: BienService,
    private annonceService: AnnonceService,
    private ressourceService: RessourceService,
    private commentaireService:CommentaireService
  ) {}
  ngOnInit(): void {
    // liste annonce
    this.annonceListe();
    // liste ressources
    this.ressourceListe();
    this.getAllBien();
    this.affichepublication();
    this.getAllComments();
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

  getAllBien() {
    // liste bien-perdu-retrouve
    this.bienService.listerBiens().subscribe(
      (biens) => {
        // Afficher la liste des annonces
        console.log(biens);
        this.bienList = biens.data;

        console.log(this.bienList);
      },

      (error) => {
        // Traiter l'erreur de liste
      }
    );
  }

  // dataHomepublication: any;
  lastThreePublications: any[] = [];
  affichepublication(): void {
    // liste annonce
    this.annonceService.listerAnnonces().subscribe((annonce) => {
      // Afficher la liste des annonces
      console.log(annonce);
      this.annonceList = annonce.data;
      // console.log(user.data);

      console.log(this.annonceList);

      // virifier si les donnee sont null
      if (this.annonceList != null) {
        // Trier les publications par date de création dans l'ordre décroissant
        const sortedPublications = this.annonceList.sort(
          (
            a: { created_at: string | number | Date },
            b: { created_at: string | number | Date }
          ) => {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          }
        );
        // Prendre les trois dernières publications
        this.lastThreePublications = sortedPublications.slice(0, 3);
        console.log('vor dernietr', this.lastThreePublications);
      }
    });
  }

  // pour recuperer une annonce
  idAnnonce: number = 0;
  getAnnonce(annonce: any) {
    this.annonceSelectionner = annonce;
    this.idAnnonce = annonce.id;
    console.log('tyep', this.idAnnonce);
    localStorage.setItem('idAnnonce', JSON.stringify(this.idAnnonce));
    this.getAllComments(); // Actualise la page
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
        this.commentAnnonce = this.listCommentaire.filter(
          (comment) => parseInt(comment.annonce_id) === this.idAnnonce
        );

        console.log('comments of annonce: ', this.commentAnnonce);
      },

      (error) => {
        // Traiter l'erreur de liste
      }
    );
  }
}
