import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RessourceService } from 'src/app/services/ressource.service';
import Swal from 'sweetalert2';
import { AnnonceService } from 'src/app/services/annonce.service';


@Component({
  selector: 'app-gestion-ressource',
  templateUrl: './gestion-ressource.component.html',
  styleUrls: ['./gestion-ressource.component.css'],
})
export class GestionRessourceComponent implements OnInit {
  ressourceList: any[] = [];
  annonceList: any[] = [];
  utilisateurList: any[] = [];
  dtOptions: DataTables.Settings = {};
  ressourceSelectionner: any = {};

  // variable
  nom!: any;
  nature!: string;

  // verif
  verifNom!: string;
  verifNature!: string;

  // exact
  exactNom: boolean = false;
  exactNature: boolean = false;

  //Sidebar toggle show hide function
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private ressourceService: RessourceService,
    private annonceService: AnnonceService
  ) {}
  verifNatureFonction() {
    this.exactNature = false;
    if (this.nature == '') {
      this.verifNature = 'Veuillez renseigner le contenu';
    } else if (this.nature.length < 10) {
      this.verifNature = 'Le contenu est trop court';
    } else {
      this.verifNature = '';
      this.exactNature = true;
    }
  }

  verifNomFonction() {
    this.exactNom = false;
    if (this.nom == '') {
      this.verifNom = 'Veuillez renseigner le contenu';
    }
    // else if (this.nom.length < 5) {
    //   this.verifNom = 'Le contenu est trop court';
    // }
    else if (!isNaN(this.nom)) {
      this.verifNom = 'Le contenu doit etre un text';
    } else {
      this.verifNom = '';
      this.exactNom = true;
    }
  }

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

    // liste ressources
    this.ressourceService.listerRessources().subscribe(
      (ressources) => {
        // Afficher la liste des annonces
        console.log(ressources);
        this.ressourceList = ressources.data;

        console.log(this.ressourceList);
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
  }

  // pour recuperer un produit
  getRessource(ressource: any) {
    this.ressourceSelectionner = ressource;
  }

  // ajouter produit
  onSubmit() {
    let formData = new FormData();
    formData.append('nom', this.nom);
    formData.append('nature', this.nature);
    console.log(formData);
    this.ressourceService.ajouterRessource(formData).subscribe((response) => {
      console.log(response);
      this.ressourceService.verifierChamp(
        '',
        response.status_message,
        'success'
      );
      if (response.status_code === 200) {
        this.viderChamp();

        this.ngOnInit(); // Actualise la page
      } else {
        this.ressourceService.verifierChamp(
          '',
          response.status_message,
          'error'
        );
      }
    });
  }

  // methode pour la transformations des images
  // getFile(event: any) {
  //   console.warn(event.target.files[0]);
  //   this.image = event.target.files[0] as File;
  // }

  SupprimeRessource(id: number) {
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
        this.ressourceService.supprimerRessource(id).subscribe(() => {
          this.ressourceService.verifierChamp(
            'Supprimé!',
            'ressource supprimé avec succès',
            'success'
          );
          // this.loadProduit();
          this.ngOnInit(); // Actualise la page
        });
      }
    });
  }

  chargerInfosTest(ressource: any) {
    this.ressourceSelectionner = ressource.id;
    console.log('esxrcdftygu', this.ressourceSelectionner);
    this.nom = ressource.nom;
    this.nature = ressource.nature;
  }
  // fonction pour modifier
  modifierRessource() {
    let data = {
      nom: this.nom,
      nature: this.nature,
    };
    console.log(data);

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
        this.ressourceService
          .updateRessource(this.ressourceSelectionner, data)
          .subscribe((response) => {
            console.log(response);
            if (response.status_code == 200) {
              this.ressourceService.verifierChamp(
                'Modifié!',
                response.status_message,
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
  viderChamp() {
    this.nom = '';
    this.nature = '';
  }
}

