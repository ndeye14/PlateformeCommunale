import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService } from '../services/ressource.service';

@Component({
  selector: 'app-ressources',
  templateUrl: './ressources.component.html',
  styleUrls: ['./ressources.component.css'],
})
export class RessourcesComponent implements OnInit {
  ressourceList: any[] = [];
  ressourceListFilter: any[] = [];
  filterValue: any;
  articleParPage = 3;
  pageActuelle = 1;
  ressourceSelectionner: any = {};
  ressource: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private ressourceService: RessourceService
  ) {}

  ngOnInit(): void {
    // liste ressources
    this.ressourceService.listerRessources().subscribe(
      (ressources) => {
        // Afficher la liste des annonces
        console.log(ressources);
        this.ressourceList = ressources.data;
        console.log(this.ressourceList);
        this.ressourceListFilter = this.ressourceList;
        console.log(this.ressourceListFilter);
      },

      (error) => {
        // Traiter l'erreur de liste
      }
    );
    // recuperer une ressource
    this.route.params.subscribe((params) => {
      const ressourceId = params['id'];
      this.ressourceService
        .getRessourceById(ressourceId)
        .subscribe((response) => {
          this.ressource = response.data;
          console.log(this.ressource);
        });
    });
  }

  // Methode de recherche automatique pour annonce sur
  onSearch() {
    // Recherche se fait selon le nom
    this.ressourceListFilter = this.ressourceList.filter((elt: any) =>
      elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }
  // pour recuperer un ressource
  getRessource(ressource: any) {
    this.ressourceSelectionner = ressource;
  }

  // pagination

  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articleParPage;
    const indexFin = indexDebut + this.articleParPage;
    let data = this.ressourceList.slice(indexDebut, indexFin);
    return data;
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(
      this.ressourceList.length / this.articleParPage
    );
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.ressourceList.length / this.articleParPage);
  }
}
