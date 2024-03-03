import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-espace-perso',
  templateUrl: './espace-perso.component.html',
  styleUrls: ['./espace-perso.component.css'],
})
export class EspacePersoComponent {
  public sidebarShow: boolean = false;
  produitList: any[] = [];
  produitListFilter: any[] = [];
  filterValue: any;

  // Methode de recherche automatique pour annonce sur
  onSearch() {
    // Recherche se fait selon le nom
    this.produitListFilter = this.produitList.filter(
      (elt: any) =>
        elt?.nom_produit
          .toLowerCase()
          .includes(this.filterValue.toLowerCase()) ||
        elt?.prix.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }
}
