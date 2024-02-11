import { ressource } from './../models/ressource.model';
import { RessourceService } from 'src/app/services/ressource.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-ressource',
  templateUrl: './detail-ressource.component.html',
  styleUrls: ['./detail-ressource.component.css'],
})
export class DetailRessourceComponent implements OnInit {
  ressource: any;
  ressourceList: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private ressourceService: RessourceService
  ) {}

  ngOnInit(): void {
    // recuperer une ressource
    this.route.params.subscribe((params) => {
      const ressourceId = params['id'];
      this.ressourceService
        .getRessourceById(ressourceId)
        .subscribe((response) => {
          this.ressource = response.data;
          console.log(this.ressource);
        });
    });
  }
}
