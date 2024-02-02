import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { annuaire } from 'src/app/models/annuaire.model';
import { AnnuaireService } from 'src/app/services/annuaire.service';
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
  dtOptions: DataTables.Settings = {};
  annuaireSelectionner: any = {};

  // varibles
  nom!: string;
  adress!: string;
  couriel!: string;
  image: any;
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
    // let annonce = {
    //   description: this.description,
    //   date_activite: this.date,
    //   lieu: this.lieu,
    //   images: this.image,
    // };
    let formData = new FormData();
    formData.append('nom', this.nom);
    formData.append('adress', this.adress);
    formData.append('couriel', this.couriel);
    formData.append('image', this.image);
    console.log(formData);
    this.annuaireService.ajouterAnnuaire(formData).subscribe((response) => {
      console.log(response);
    });
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
    //libelle, lieu, description , date, image, categorie_id
    // const data = {
    //   nom: this.nomUp,
    //   adress: this.adressUp,
    //   couriel: this.courielUp,
    //   image: this.image,
    // };
   let formData = new FormData();
   formData.append('nom', this.nomUp);
   formData.append('adress', this.adressUp);
   formData.append('couriel', this.courielUp);
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
               'Modifié!',
               'annuaire modifié avec succès',
               'success'
             );
            console.log('je suis response', response);
          });
        this.ngOnInit(); // Actualise la page
      };
    })

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
        this.annuaireService.supprimerAnnuaire(id).subscribe(() => {
          this.annuaireService.verifierChamp(
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
}
