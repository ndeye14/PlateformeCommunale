import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { window } from 'rxjs';
import { AnnonceService } from 'src/app/services/annonce.service';
import { BienService } from 'src/app/services/bien.service';
import { RessourceService } from 'src/app/services/ressource.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-bien',
  templateUrl: './gestion-bien.component.html',
  styleUrls: ['./gestion-bien.component.css'],
})
export class GestionBienComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private bienService: BienService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private annonceService: AnnonceService,
    private ressourceService: RessourceService
  ) {}
  bienList: any[] = [];
  utilisateurList: any[] = [];
  annonceList: any[] = [];
  ressourceList: any[] = [];

  dtOptions: DataTables.Settings = {};
  bienSelectionner: any = {};

  // varaiables
  nom!: string;
  caracteristique!: string;
  contact!: string;
  image!: any;
  statut!: string;
  // variable pour modifier
  // nomUp!: string;
  // caracteristiqueUp!: string;
  // contactUp!: string;
  // imageUp!: any;
  // statutUp!: string;

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
    this.getAllBien();

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

  // pour recuperer une annonce
  getBien(bien: any) {
    this.bienSelectionner = bien;
  }
  getAllBien() {
    // liste bien-perdu-retrouve
    this.bienService.listerBiens().subscribe(
      (biens) => {
        // Afficher la liste des annonces
        console.log(biens);
        this.bienList = biens.data;

        console.log(this.bienList);
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
    // alert(this.statut);
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
        // this.ngOnInit();
        // const modalElement: HTMLElement | null =
        //   document.getElementById('modifie');
        // modalElement!.style.display = 'none'
      } else {
        this.bienService.verifierChamp(
          '!!!!',
          response.status_message,
          'error'
        );
      }
      // window.location.reload();
    });
  }

  SupprimeBien(id: number) {
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
        this.bienService.supprimerBien(id).subscribe((response) => {
          this.bienService.verifierChamp(
            '!!!!',
            response.status_message,
            'success'
          );
        });
      }
    });
    this.ngOnInit(); // Actualise la page

  }

  chargerInfosTest(bien: any) {
    this.bienSelectionner = bien.id;
    console.log('esxrcdftygu', this.bienSelectionner);
    this.nom = bien.nom;
    this.caracteristique = bien.caracteristique;
    this.contact = bien.contact;
    this.image = bien.image;
    this.statut = bien.statut;
  }
  // fonction pour modifier
  modifierBien() {
    let formData = new FormData();
    formData.append('nom', this.nom);
    formData.append('caracteristique', this.caracteristique);
    formData.append('contact', this.contact);
    formData.append('image', this.image);
    formData.append('statut', this.statut);
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
        this.bienService
          .updateBien(this.bienSelectionner, formData)
          .subscribe((response) => {
            console.log(response);
              this.bienService.verifierChamp(
                '!!!!',
                response.status_message,
                'success'
              );
            if (response.status_code == 200) {
              this.viderChamp();
              this.getAllBien();
              // const modalElement: HTMLElement | null =
              //   document.getElementById('modifie');
              // modalElement!.style.display = 'none';
            } else {
              this.bienService.verifierChamp(
                '!!!!',
                response.status_message,
                'error'
              );
            }
          });
        //  window.location.reload(); // Actualise la page
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

  viderChamp() {
    this.nom = '';
    this.caracteristique = '';
    this.contact = '';
    this.image = '';
    this.statut = '';
  }
}
