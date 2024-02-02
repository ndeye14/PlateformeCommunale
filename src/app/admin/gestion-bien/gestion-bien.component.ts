import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BienService } from 'src/app/services/bien.service';
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
    private router: Router
  ) {}
  bienList: any[] = [];
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
    // liste annonce
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
  //Sidebar toggle show hide function
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  // pour recuperer une annonce
  getBien(bien: any) {
    this.bienSelectionner = bien;
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
      console.log(response);
      this.ngOnInit();
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
        this.bienService.supprimerBien(id).subscribe(() => {
          this.bienService.verifierChamp(
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
          .updateBien(this.bienSelectionner,formData)
          .subscribe((response) => {
            console.log(response);
            if (response.status_code == 200) {
              this.bienService.verifierChamp(
                'Modifié!',
                'bien modifié avec succès',
                'success'
              );
              window.location.reload();
            }
            else {
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
}