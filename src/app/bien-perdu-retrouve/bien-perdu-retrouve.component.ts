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
  nom!: string;
  caracteristique!: string;
  contact!: string;
  image!: any;
  statut!: string;
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

  ngOnInit(): void {
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
    // let annonce = {
    //   description: this.description,
    //   date_activite: this.date,
    //   lieu: this.lieu,
    //   images: this.image,
    // };
    let formData = new FormData();
    formData.append('nom', this.nom);
    formData.append('caracteristique', this.caracteristique);
    formData.append('contact', this.contact);
    formData.append('image', this.image);
    formData.append('statut', this.statut);
    console.log(formData);

    this.bienService.ajouterBien(formData).subscribe((response) => {
      if (response.status_code == 200) {
        this.bienService.verifierChamp(
          'ajoute',
          'bien ajoute avec success',
          'success'
        );
        console.log(response);
        this.ngOnInit();
      } else if (response.message == 'Erreur de validation') {
        this.bienService.verifierChamp(
          'erreur',
          'veillez remplir tous les champs correctement',
          'error'
        );
      }
    });
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
}
