import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-commentaire',
  templateUrl: './gestion-commentaire.component.html',
  styleUrls: ['./gestion-commentaire.component.css']
})
export class GestionCommentaireComponent {
   //Sidebar toggle show hide function
  status = false;
  addToggle()
  {
    this.status = !this.status;
  }

}
