import { Component, OnInit } from '@angular/core';
import { CommentaireService } from '../services/commentaire.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { AnnonceService } from '../services/annonce.service';

@Component({
  selector: 'app-detail-annonce',
  templateUrl: './detail-annonce.component.html',
  styleUrls: ['./detail-annonce.component.css'],
})
export class DetailAnnonceComponent implements OnInit {
  description: any;
  annonce: any;
  listCommentaire: any[] = [];
  commentAnnonce: any;
  // pour recuperer une annonce
  idAnnonce: any;
  // annonceId:any;

  constructor(
    // private authGuard: AuthGuard,
    private commentaireService: CommentaireService,
    private route: ActivatedRoute,
    private annonceService: AnnonceService
  ) {}
  ngOnInit(): void {
    this.getAllComments();
    this.idAnnonce = localStorage.getItem('idAnnonce');
    console.log('type', typeof this.idAnnonce);

    // recuperer une annonce
    this.route.params.subscribe((params) => {
      const annonceId = params['id'];
      this.annonceService.getAnnonceById(annonceId).subscribe((response) => {
        this.annonce = response.data;
        console.log(this.annonce);
      });
    });
  }
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
          (comment: any) => parseInt(comment.annonce_id) === parseInt(this.idAnnonce)
        );

        console.log('comments of annonce: ', this.commentAnnonce);
        console.log('comments of total: ', this.listCommentaire);
      },

      (error) => {
        // Traiter l'erreur de liste
      }
    );
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
}
