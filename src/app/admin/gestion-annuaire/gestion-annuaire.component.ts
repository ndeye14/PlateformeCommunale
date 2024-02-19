import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { window } from 'rxjs';
import { annuaire } from 'src/app/models/annuaire.model';
import { AnnonceService } from 'src/app/services/annonce.service';
import { AnnuaireService } from 'src/app/services/annuaire.service';
import { RessourceService } from 'src/app/services/ressource.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
// import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-gestion-annuaire',
  templateUrl: './gestion-annuaire.component.html',
  styleUrls: ['./gestion-annuaire.component.css'],
})
export class GestionAnnuaireComponent implements OnInit {
  annuaireList: any[] = [];
  annonceList: any[] = [];
  ressourceList: any[] = [];
  utilisateurList: any[] = [];
  dtOptions: DataTables.Settings = {};
  annuaireSelectionner: any = {};

  // varibles
  nom!: string;
  adress!: string;
  couriel!: string;
  image: any;
  // verif
  verifNom!: string;
  verifAdress!: string;
  verifCouriel!: string;
  verifImage: any;
  // exact
  exactNom: boolean = false;
  exactAdress: boolean = false;
  exactCouriel: boolean = false;
  exactImage: boolean = false;

  // varibles pour modifier
  nomUp!: string;
  adressUp!: string;
  courielUp!: string;
  imageUp: any;

  constructor(
    private http: HttpClient,
    private annuaireService: AnnuaireService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
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

    this.getAllAnnuaire();

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

  verifNomFonction() {
    this.exactNom = false;
    if (this.nom == '') {
      this.verifNom = 'Veuillez renseigner le Nom';
    } else if (this.nom.length < 2) {
      this.verifNom = 'Le Nom de l annuaire est trop court';
    } else {
      this.verifNom = '';
      this.exactNom = true;
    }
  }
  
  getAllAnnuaire() {
    // liste annuaire
    this.annuaireService.listerAnnuaires().subscribe(
      (annuaires) => {
        // Afficher la liste des annonces
        console.log(annuaires);
        this.annuaireList = annuaires.data;

        console.log(this.annuaireList);
      },

      (error) => {
        // Traiter l'erreur de liste
      }
    );
  }

  //Sidebar toggle show hide function
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  // pour recuperer une annonce
  getAnnuaire(annuaire: any) {
    this.annuaireSelectionner = annuaire;
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
    formData.append('adress', this.adress);
    if (this.couriel.includes('@') && this.couriel.includes('.')) {
      formData.append('couriel', this.couriel);
    }
    formData.append('image', this.image);
    console.log(formData);

    this.annuaireService.ajouterAnnuaire(formData).subscribe((response) => {
      console.log(response);
      this.annuaireService.verifierChamp(
        '!!!!',
        response.status_message,
        'success'
      );
      if (response.status_code == 200) {
        this.viderChamps();
        this.getAllAnnuaire();
        this.ngOnInit();
        // const modalElement: HTMLElement | null =
        //   document.getElementById('modifie');
        // modalElement!.style.display = 'none';

        this.getAllAnnuaire();
      } else {
        this.annuaireService.verifierChamp(
          '!!!!',
          response.status_message,
          'success'
        );
      }
    });

    this.ngOnInit();
  }

  chargerInfosTest(annuaire: any) {
    this.annuaireSelectionner = annuaire.id;
    console.log('esxrcdftygu', this.annuaireSelectionner);
    this.nomUp = annuaire.nom;
    this.adressUp = annuaire.adress;
    this.courielUp = annuaire.couriel;
    // this.image = annuaire.image;
  }
  // fonction pour modifier
  modifierAnnuaire() {
    let formData = new FormData();
    formData.append('nom', this.nomUp);
    formData.append('adress', this.adressUp);
    if (this.courielUp.includes('@') && this.courielUp.includes('.')) {
      formData.append('couriel', this.courielUp);
    }
    formData.append('image', this.image);
    console.log('je suis annonce', this.annuaireSelectionner);
    console.log('je suis data', formData);
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière après cette action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#017D03',
      cancelButtonColor: '#FF9C00',
      confirmButtonText: 'Oui, modifier!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.annuaireService
          .updateAnnuaire(this.annuaireSelectionner, formData)
          .subscribe((response) => {
            this.annuaireService.verifierChamp(
              '!!!!',
              response.status_message,
              'success'
            );
            console.log('je suis response', response);
            if (response.status_code == 200) {
              this.viderChampsUp();

              // const modalElement: HTMLElement | null =
              //   document.getElementById('modifie');
              // modalElement!.style.display = 'none';

              this.getAllAnnuaire();
            } else {
              this.annuaireService.verifierChamp(
                '!!!!',
                response.status_message,
                'success'
              );
            }
          });
      }
    });
    this.ngOnInit(); // Actualise la page
  }

  SupprimeAnnuaire(id: number) {
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
        this.annuaireService.supprimerAnnuaire(id).subscribe((response) => {
          this.annuaireService.verifierChamp(
            'Supprimé!',
            response.status_message,
            'success'
          );
          this.getAllAnnuaire();
          this.ngOnInit(); // Actualise la page
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

  viderChamps() {
    this.nom = '';
    this.adress = '';
    this.couriel = '';
    this.image = '';
  }
  viderChampsUp() {
    this.nomUp = '';
    this.adressUp = '';
    this.courielUp = '';
    this.imageUp = '';
  }
}
