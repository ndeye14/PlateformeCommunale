import { Component, OnInit } from '@angular/core';
import { AnnuaireService } from '../services/annuaire.service';

@Component({
  selector: 'app-annuaires',
  templateUrl: './annuaires.component.html',
  styleUrls: ['./annuaires.component.css'],
})
export class AnnuairesComponent implements OnInit {
  annuaireList: any[] = [];
  annuaireListFiler: any[] = [];

  constructor(private annuaireService: AnnuaireService) {}

  ngOnInit(): void {
    // liste annuaire
    this.annuaireService.listerAnnuaires().subscribe(
      (annuaires) => {
        // Afficher la liste des annonces
        console.log(annuaires);
        this.annuaireList = annuaires.data;
        console.log(this.annuaireList);
        this.annuaireListFiler = this.annuaireList;
        console.log(this.annuaireListFiler);
      },
      (error) => {
        // Traiter l'erreur de liste
      }
    );
  }
}


