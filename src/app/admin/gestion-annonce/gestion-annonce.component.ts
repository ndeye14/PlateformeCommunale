import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnnonceService } from 'src/app/services/annonce.service';
import { ActivatedRoute } from '@angular/router';
import { url } from 'src/app/services/Apiurl';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


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

  annonceList: any[] = [];
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
    private router: Router
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

    // details article
    // this.route.params.subscribe((params) => {
    //   const annonceId = params['id'];
    //   console.log(annonceId);

    //   this.annoncesService.getAnnonceById(annonceId).subscribe((data: any) => {
    //     this.annonceRecu = data;
    //     console.log(this.annonceRecu); // Afficher l'annonce récupérée
    //   });
    // });
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
    formData.append('description', this.description);
    formData.append('date_activite', this.date);
    formData.append('lieu', this.lieu);
    formData.append('images', this.image);
    console.log(formData);
    this.annoncesService.ajouterAnnonce(formData).subscribe((response) => {
      console.log(response);
    });
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
          'modifie!',
          'annonce modifie avec succès',
          'success'
        );
            window.location.reload();

      });
        this.ngOnInit()

      };
      console.log('je suis annonce', this.annonceSelectionner);
      console.log('je suis data', formData);

    });



    //libelle, lieu, description , date, image, categorie_id
    // const data = {
    //   description: this.description,
    //   date_activite: this.date,
    //   lieu: this.lieu,
    //    image: this.image,
    // };



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
        this.annoncesService.supprimerAnnonce(id).subscribe(() => {
          this.annoncesService.verifierChamp(
            'Supprimé!',
            'annonce supprimé avec succès',
              'success',

          );
          // this.loadProduit();
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
    )
  }



}
