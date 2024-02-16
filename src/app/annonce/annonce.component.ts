import { Component, OnInit } from '@angular/core';
// import { AuthGuard } from '../services/auth.guard';
import { Router } from '@angular/router';
import { AnnonceService } from '../services/annonce.service';
import { CommentaireService } from '../services/commentaire.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css'],
})
export class AnnonceComponent implements OnInit {
  annonceList: any[] = [];
  annonceListFilter: any[] = [];
  annonceSelectionner: any = {};
  description: any;
  listCommentaire: any[] = [];
  commentAnnonce: any[]=[];
  articleParPage = 5;
  pageActuelle = 1;


  filterValue: string = '';
  constructor(
    private router: Router,
    // private authGuard: AuthGuard,
    private annoncesService: AnnonceService,
    private commentaireService: CommentaireService
  ) {}

  ngOnInit(): void {
    this.getAllAnnonces();
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

  // liste annonce
  getAllAnnonces() {
    // liste annonce
    this.annoncesService.listerAnnonces().subscribe(
      (response:any) => {
        // Afficher la liste des annonces
        console.log(response);
        this.annonceList = response.data;
        console.log(this.annonceList);
        this.annonceListFilter = this.annonceList;
        console.log(this.annonceListFilter);
      },

      (error) => {
        // Traiter l'erreur de liste
      }
    );
  }

  // Methode de recherche automatique pour annonce sur
  onSearch() {
    // Recherche se fait selon le lieu
    this.annonceListFilter = this.annonceList.filter(
      (elt: any) =>
        elt?.lieu.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        elt?.description
          .toLowerCase()
          .includes(this.filterValue.toLowerCase()) ||
        elt?.date_activite.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  // pour recuperer une annonce
  idAnnonce: number = 0;
  getAnnonce(annonce: any) {
    this.annonceSelectionner = annonce;
    this.idAnnonce = annonce.id;
    console.log('tyep', this.idAnnonce);
    localStorage.setItem('idAnnonce', JSON.stringify(this.idAnnonce));
    localStorage.setItem(
      'annonceSelectionner',
      JSON.stringify(this.annonceSelectionner)
    );
    this.getAllComments(); // Actualise la page
  }

  ajoutComment() {
    let comment = {
      description: this.description,
      annonce_id: this.idAnnonce,
    };
    console.log(comment);

    this.commentaireService.postComments(comment).subscribe((response) => {
      console.log(response);
      this.getAllComments(); // Actualise la page
    });
  }

  // pagination

  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articleParPage;
    const indexFin = indexDebut + this.articleParPage;
    let data = this.annonceList.slice(indexDebut, indexFin);
    return data;
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(
      this.annonceList.length / this.articleParPage
    );
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.annonceList.length / this.articleParPage);
  }
}
