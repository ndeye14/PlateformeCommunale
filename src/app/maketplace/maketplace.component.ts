import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-maketplace',
  templateUrl: './maketplace.component.html',
  styleUrls: ['./maketplace.component.css'],
})
export class MaketplaceComponent implements OnInit {
  produitList: any[] = [];
  produitListFilter: any[] = [];
  filterValue: any;
  articleParPage = 4;
  pageActuelle = 1;
  // variable
  nom_produit!: string;
  prix!: string;
  contact!: string;
  image!: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.getAllProduits();
  }

  getAllProduits() {
    // liste produit maketplace
    this.produitService.listerProduits().subscribe(
      (produits) => {
        // Afficher la liste des produit
        console.log(produits);
        this.produitList = produits.data;
        console.log(this.produitList);
        this.produitListFilter = this.produitList;
        console.log(this.produitListFilter);
      },
      (error) => {
        // Traiter l'erreur de liste
      }
    );
  }

  // ajouter produit maketplace
  onSubmit() {
    let formData = new FormData();
    formData.append('nom_produit', this.nom_produit);
    formData.append('prix', this.prix);
    formData.append('contact', this.contact);
    formData.append('images', this.image);
    console.log(formData);
    this.produitService.ajouterProduit(formData).subscribe((response) => {
      console.log(response);
      this.produitService.verifierChamp('', response.status_message, 'success');
      this.getAllProduits(); // Actualise la page
    });
  }

  // methode pour la transformations des images
  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }

  // Methode de recherche automatique pour annonce sur
  onSearch() {
    // Recherche se fait selon le nom
    this.produitListFilter = this.produitList.filter(
      (elt: any) =>
        elt?.nom_produit
          .toLowerCase()
          .includes(this.filterValue.toLowerCase()) ||
        elt?.prix.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  // pagination

  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articleParPage;
    const indexFin = indexDebut + this.articleParPage;
    let data = this.produitList.slice(indexDebut, indexFin);
    return data;
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.produitList.length / this.articleParPage);
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.produitList.length / this.articleParPage);
  }
}
