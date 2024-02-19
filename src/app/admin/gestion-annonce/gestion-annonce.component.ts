import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnnonceService } from 'src/app/services/annonce.service';
import { ActivatedRoute } from '@angular/router';
import { url } from 'src/app/services/Apiurl';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { RessourceService } from 'src/app/services/ressource.service';


@Component({
  selector: 'app-gestion-annonce',
  templateUrl: './gestion-annonce.component.html',
  styleUrls: ['./gestion-annonce.component.css'],
})
export class GestionAnnonceComponent implements OnInit {
  listeDemandes: any[] = [];
  demandeSelectionner: any = {};
  // variable pour annonce
  descriptionUp!: string;
  dateUp!: string;
  lieuUp!: string;
  imageUp: any;
  // variable pour verifier
  verifDescription!: string;
  verifDate!: string;
  verifLieu!: string;
  verifImage: any;
  // variable pour si c exact
  exactDescription: boolean = false;
  exactDate: boolean = false;
  exactLieu: boolean = false;
  exactImage: any;

  annonceList: any[] = [];
  utilisateurList: any[] = [];
  ressourceList: any[] = [];
  dtOptions: DataTables.Settings = {};

  annonceRecu: any;

  annonceSelectionner: any = {};

  // variable pour annonce
  description!: string;
  date!: string;
  lieu!: string;
  image: any;
  

  //Sidebar toggle show hide function
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  constructor(
    private http: HttpClient,
    private annoncesService: AnnonceService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private ressouresService: RessourceService
  ) {}

  verifDescriptionFonction() {
    this.exactDescription = false;
    if (this.description == '') {
      this.verifDescription = 'Veuillez renseigner votre description';
    } else if (this.description.length < 10) {
      this.verifDescription = 'Le description est trop court';
    } else {
      this.verifDescription = '';
      this.exactDescription = true;
    }
  }
  verifLieuFonction() {
    this.exactLieu = false;
    if (this.lieu == '') {
      this.verifLieu = 'Veuillez renseigner le Lieu';
    } else if (this.lieu.length < 3) {
      this.verifLieu = 'Le Lieu est trop court';
    } else {
      this.verifLieu = '';
      this.exactLieu = true;
    }
  }
  tomorrow: any = new Date(Date.now() + 24 * 60 * 60 * 1000);

  verifDateFonction() {
    this.exactDate = false;
    if (this.date == '') {
      this.verifDate = 'Veuillez renseigner la date';
    } else if (this.date < this.tomorrow) {
      this.verifDate = 'Donner une date valide';
    } else {
      this.verifDate = '';
      this.exactDate = true;
    }
  }
  verifImageFonction() {
    this.exactImage = false;
    if (this.image == '') {
      this.verifImage = 'Veuillez donner une Image';
    } else {
      this.verifImage = '';
      this.exactImage = true;
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
    // liste
    this.getAllAnnonce();

    // liste user
    this.userService.listerUtilisateurs().subscribe(
      (user) => {
        // Afficher la liste des annonces
        console.log(user);
        this.utilisateurList = user.data;

        console.log(this.utilisateurList);
      },

      (error) => {
        // Traiter l'erreur de liste
      }
    );
    // liste ressource
    this.ressouresService.listerRessources().subscribe(
      (ressource) => {
        // Afficher la liste des annonces
        console.log(ressource);
        this.ressourceList = ressource.data;

        console.log(this.ressourceList);
      },

      (error) => {
        // Traiter l'erreur de liste
      }
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
    formData.append('description', this.description);
    formData.append('date_activite', this.date);
    formData.append('lieu', this.lieu);
    formData.append('images', this.image);
    console.log(formData);
    this.annoncesService.ajouterAnnonce(formData).subscribe((response) => {
      console.log(response);
      this.annoncesService.verifierChamp(
        '!',
        response.status_message,
        'success'
      );
      if (response.status_code == 200) {
        this.viderChamp();
        this.getAllAnnonce();
        this.ngOnInit();
        // const modalElement: HTMLElement | null =
        //   document.getElementById('modifie');
        // modalElement!.style.display = 'none';

        this.getAllAnnonce();
      } else {
        this.annoncesService.verifierChamp(
          '!!!!',
          response.status_message,
          'success'
        );
      }

      // this.getAllAnnonce();
    });
    this.ngOnInit();
  }

  // pour recuperer une annonce
  getAnnonce(annonce: any) {
    this.annonceSelectionner = annonce;
  }

  // annonceObejt: any;
  chargerInfosTest(annonce: any) {
    this.annonceSelectionner = annonce.id;
    console.log('esxrcdftygu', this.annonceSelectionner);
    this.description = annonce.description;
    this.date = annonce.date_activite;
    this.lieu = annonce.lieu;
    this.image = annonce.image;
  }
  // fonction pour modifier
  modifierAnnonce() {
    let formData = new FormData();
    formData.append('description', this.description);
    formData.append('date_activite', this.date);
    formData.append('lieu', this.lieu);
    formData.append('images', this.image);
    console.log(formData);

    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière après cette action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#017D03',
      cancelButtonColor: '#FF9C00',
      confirmButtonText: 'Oui, modifie!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.annoncesService
          .updateAnnonce(this.annonceSelectionner, formData)
          .subscribe((response) => {
            console.log('je suis response', response);
            this.annoncesService.verifierChamp(
              '!!!!',
              response.status_message,
              'success'
            );
            if (response.status_code == 200) {
              this.viderChamp();
              this.getAllAnnonce();
              this.ngOnInit();
              // const modalElement: HTMLElement | null =
              //   document.getElementById('modifie');
              // modalElement!.style.display = 'none';
            } else {
              this.annoncesService.verifierChamp(
                '!!!!',
                response.status_message,
                'success'
              );
            }
            // this.getAllAnnonce();
          });
        this.ngOnInit();
        // window.location.reload();
      }
      console.log('je suis annonce', this.annonceSelectionner);
      console.log('je suis data', formData);
    });
  }

  // suppression
  SupprimeAnnonce(id: number) {
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
        this.annoncesService.supprimerAnnonce(id).subscribe((response) => {
          this.annoncesService.verifierChamp(
            '!!!!',
            response.status_message,
            'success'
          );
          this.getAllAnnonce(); // Actualise la page
        });
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
  getAllAnnonce() {
    // liste annonce
    this.annoncesService.listerAnnonces().subscribe(
      (annonces) => {
        // Afficher la liste des annonces
        console.log(annonces);
        this.annonceList = annonces.data;

        console.log(this.annonceList);
      },

      (error) => {
        // Traiter l'erreur de liste
      }
    );
  }
  viderChamp() {
    this.description = '';
    this.date = '';
    this.lieu = '';
    this.image = '';
  }
}
