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
  articleParPage = 6;
  pageActuelle = 1;
  // variable
  nom_produit!: string;
  prix!: any;
  contact!: any;
  image!: any;
  // pour verifier
  verifNom_produit!: string;
  verifPrix!: any;
  verifContact!: any;
  verifImage!: any;
  // pour exacte
  exactNom_produit: boolean = false;
  exactPrix: boolean = false;
  exactContact: boolean = false;
  exactImage: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private produitService: ProduitService
  ) {}

  NomPattern1 = /^[a-zA-Z ]+$/;
  verifNom_produitFonction() {
    this.exactNom_produit = false;
    if (this.nom_produit == '') {
      this.verifNom_produit = '';
    } else if (this.nom_produit.length < 2) {
      this.verifNom_produit = 'Le Nom  est trop court';
    } else if (!this.nom_produit.match(this.NomPattern1)) {
      this.verifNom_produit = 'Donner un nom valide';
    } else {
      this.verifNom_produit = '';
      this.exactNom_produit = true;
    }
  }
  verifPrixFonction() {
    this.exactPrix = false;
    if (this.prix == '') {
      this.verifPrix = '';
    } else if (this.prix <= 0 || isNaN(this.prix)) {
      this.verifPrix = 'Le format est invalide';
    } else {
      this.verifPrix = '';
      this.exactPrix = true;
    }
  }

  verifContactFonction() {
    // const indiaRegex = /^\+221\d{9}$/;
    this.exactContact = false;
    if (this.contact == '') {
      this.verifContact = '';
    } else if (isNaN(this.contact)) {
      this.verifContact = 'Le Contact doit etre numerique';
    }
    // Vérifie si le numéro de téléphone commence par 77, 78, 76 ou 70
    else if (!/^(77|78|76|70)\d{7}$/.test(this.contact)) {
      this.verifContact = 'Le numéro doit commencer par 77, 78, 76 ou 70';
    }
    // else if (!this.contact.match(indiaRegex)) {
    //   this.verifContact = 'Le format n est pas bon';
    // }
    else {
      this.verifContact = '';
      this.exactContact = true;
    }
  }
  verifImageFonction() {
    this.exactImage = false;
    if (this.image == '') {
      this.verifImage = '';
    } else {
      this.verifImage = '';
      this.exactImage = true;
    }
  }

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
    if (this.prix > 0 && !isNaN(this.contact)) {
      formData.append('prix', this.prix);
      formData.append('contact', this.contact);
    }
    // formData.append('prix', this.prix);
    // formData.append('contact', this.contact);

    formData.append('images', this.image);
    console.log(formData);
    this.produitService.ajouterProduit(formData).subscribe((response) => {
      console.log(response);
      this.produitService.verifierChamp(
        '!!!!',
        response.status_message,
        'success'
      );

      if (response.status_code === 200) {
        this.viderChamp();
        this.getAllProduits();
        this.ngOnInit(); // Actualise la page
      } else {
        this.produitService.verifierChamp(
          '!!!!',
          response.status_message,
          'error'
        );
      }
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
  viderChamp() {
    this.nom_produit = '';
    this.contact = '';
    this.image = '';
    this.prix = '';
  }
}
