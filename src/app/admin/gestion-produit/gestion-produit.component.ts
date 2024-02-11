import { produit } from './../../models/produit.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProduitService } from 'src/app/services/produit.service';
import Swal from 'sweetalert2';
import { AnnonceService } from 'src/app/services/annonce.service';
import { RessourceService } from 'src/app/services/ressource.service';
@Component({
  selector: 'app-gestion-produit',
  templateUrl: './gestion-produit.component.html',
  styleUrls: ['./gestion-produit.component.css'],
})
export class GestionProduitComponent implements OnInit {
  produitList: any[] = [];
  utilisateurList: any[] = [];
  annonceList: any[] = [];
  ressourceList: any[] = [];
  dtOptions: DataTables.Settings = {};
  produitSelectionner: any = {};
  // variable
  nom_produit!: string;
  prix!: string;
  contact!: string;
  image!: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private produitService: ProduitService,
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
    // liste produit maketplace
    this.produitService.listerProduits().subscribe(
      (produits) => {
        // Afficher la liste des annonces
        console.log(produits);
        this.produitList = produits.data;

        console.log(this.produitList);
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
  //Sidebar toggle show hide function
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  // ajouter produit
  onSubmit() {
    let formData = new FormData();
    formData.append('nom_produit', this.nom_produit);
    formData.append('prix', this.prix);
    formData.append('contact', this.contact);
    formData.append('images', this.image);
    console.log(formData);
    this.produitService.ajouterProduit(formData).subscribe((response) => {
      console.log(response);
      this.produitService.verifierChamp(
        'ajoute!',
        'bien ajoute avec succès',
        'success'
      );
      this.ngOnInit(); // Actualise la page
    });
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
  // pour recuperer un produit
  getProduit(produit: any) {
    this.produitSelectionner = produit;
  }

  SupprimeProduit(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière après cette action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#017D03',
      cancelButtonColor: '#FF9C00',
      confirmButtonText: 'Oui, supprimer!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.produitService.supprimerProduit(id).subscribe(() => {
          this.produitService.verifierChamp(
            'Supprimé!',
            'annonce supprimé avec succès',
            'success'
          );
          // this.loadProduit();
          this.ngOnInit(); // Actualise la page
        });
      }
    });
  }
  // methode pour la transformations des images
  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }

  chargerInfosTest(produit: any) {
    this.produitSelectionner = produit.id;
    console.log('esxrcdftygu', this.produitSelectionner);
    this.nom_produit = produit.nom_produit;
    this.prix = produit.prix;
    this.contact = produit.contact;
    this.image = produit.image;
  }
  // fonction pour modifier
  modifierProduit() {
    let formData = new FormData();
    formData.append('nom_produit', this.nom_produit);
    formData.append('prix', this.prix);
    formData.append('contact', this.contact);
    formData.append('image', this.image);
    console.log(formData);
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière après cette action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#017D03',
      cancelButtonColor: '#FF9700',
      confirmButtonText: 'Oui, modifier!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.produitService
          .updateProduit(this.produitSelectionner, formData)
          .subscribe((response) => {
            console.log(response);
            if (response.status_code == 200) {
              this.produitService.verifierChamp(
                'Modifié!',
                'produit modifié avec succès',
                'success'
              );
              window.location.reload();
            } else {
              console.log(response.status_message);
              alert(response.status_message);
            }
          });
        this.ngOnInit(); // Actualise la page
      }
    });
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
