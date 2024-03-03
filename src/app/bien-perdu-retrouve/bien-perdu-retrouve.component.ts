import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BienService } from '../services/bien.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-bien-perdu-retrouve',
  templateUrl: './bien-perdu-retrouve.component.html',
  styleUrls: ['./bien-perdu-retrouve.component.css'],
})
export class BienPerduRetrouveComponent implements OnInit {
  // varaiables
  nom!: any;
  caracteristique!: any;
  contact!: any;
  image!: any;
  statut!: string;

  // verifier
  verifNom!: string;
  verifCaracteristique!: string;
  verifContact!: string;
  verifImage!: any;
  verifStatut!: string;
  // exact
  exactNom: boolean = false;
  exactCaracteristique: boolean = false;
  exactContact: boolean = false;
  exactImage: boolean = false;
  exactStatut: boolean = false;
  // liste des tab
  bienList: any[] = [];
  bienListFilter: any[] = [];
  filterValue: any;
  articleParPage = 6;
  pageActuelle = 1;

  constructor(
    private http: HttpClient,
    private bienService: BienService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  NomPattern1 = /^[a-zA-Z ]+$/;
  verifNomFonction() {
    this.exactNom = false;
    if (this.nom == '') {
      this.verifNom = '';
    } else if (this.nom.length < 2) {
      this.verifNom = 'Le Nom du produit est trop court';
    } else if (!isNaN(this.nom)) {
      this.verifNom = 'Le nom ne doit pas etre des numeriques';
    } else if (!this.nom.match(this.NomPattern1)) {
      this.verifNom = 'Donner un nom valide';
    } else {
      this.verifNom = '';
      this.exactNom = true;
    }
  }
  verifCarateristiqueFonction() {
    this.exactCaracteristique = false;
    if (this.caracteristique == '') {
      this.verifCaracteristique = '';
    } else if (this.caracteristique.length < 5) {
      this.verifCaracteristique = 'Le Carateristique du produit est trop court';
    } else if (!isNaN(this.caracteristique)) {
      this.verifCaracteristique = 'Le nom ne doit pas etre des numeriques';
    } else if (!this.caracteristique.match(this.NomPattern1)) {
      this.verifCaracteristique = 'Donner une caracteristique valide';
    } else {
      this.verifCaracteristique = '';
      this.exactCaracteristique = true;
    }
  }
  verifContactFonction() {
    this.exactContact = false;
    if (this.contact == '') {
      this.verifContact = '';
    } else if (isNaN(this.contact)) {
      this.verifContact = 'Le contact est doit etre un numerique';
    }
    // Vérifie si le numéro de téléphone commence par 77, 78, 76 ou 70
    else if (!/^(77|78|76|70)\d{7}$/.test(this.contact)) {
      // this.verifTelephone = 'Le numéro doit commencer par 77, 78, 76 ou 70 ';
      this.verifContact = 'Le numéro doit commencer par 77, 78, 76 ou 70';
    } else {
      this.verifContact = '';
      this.exactContact = true;
    }
  }
  verifImageFonction() {
    this.exactImage = false;
    if (this.image == '') {
      this.verifImage = 'Veuillez mettre une Image';
    } else {
      this.verifImage = '';
      this.exactImage = true;
    }
  }
  verifStatutFonction() {
    this.exactStatut = false;
    if (this.statut == '') {
      this.verifStatut = 'Veuillez selectionner une Statut';
    } else {
      this.verifStatut = '';
      this.exactStatut = true;
    }
  }

  ngOnInit(): void {
    this.getAllBien();
  }
  getAllBien() {
    // liste bien-perdu-retrouve
    this.bienService.listerBiens().subscribe(
      (biens) => {
        // Afficher la liste des bien-perdu-retrouve
        console.log(biens);
        this.bienList = biens.data;
        console.log(this.bienList);
        this.bienListFilter = this.bienList;
        console.log(this.bienListFilter);
      },
      (error) => {
        // Traiter l'erreur de liste
      }
    );
  }

  // Methode de recherche automatique pour bien
  onSearch() {
    // Recherche se fait selon le nom et  status
    this.bienListFilter = this.bienList.filter(
      (elt: any) =>
        elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        elt?.statut.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  // methode pour la transformations des images
  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }

  // ajouter annonce
  onSubmit() {
    let formData = new FormData();
    formData.append('nom', this.nom);
    formData.append('caracteristique', this.caracteristique);
    formData.append('contact', this.contact);
    formData.append('image', this.image);
    formData.append('statut', this.statut);
    console.log(formData);

    this.bienService.ajouterBien(formData).subscribe((response) => {
      console.log(response);
      this.bienService.verifierChamp(
        '!!!!!',
        response.status_message,
        'success'
      );
      if (response.status_code == 200) {
        this.viderChamp();
        this.getAllBien();
      } else {
        this.bienService.verifierChamp(
          '!!!!!',
          response.status_message,
          'error'
        );
      }
    });
    this.ngOnInit();
  }
  // pagination

  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articleParPage;
    const indexFin = indexDebut + this.articleParPage;
    let data = this.bienList.slice(indexDebut, indexFin);
    return data;
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.bienList.length / this.articleParPage);
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.bienList.length / this.articleParPage);
  }
  viderChamp() {
    this.nom = '';
    this.caracteristique = '';
    this.contact = '';
    this.image = '';
    this.statut = '';
  }
}
