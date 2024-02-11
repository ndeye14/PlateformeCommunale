import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { RessourceService } from '../services/ressource.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  nom!: string;
  email!: string;
  message!: string;

  constructor(private messageService: MessageService,
  private ressourceservice:RessourceService) { }
  ngOnInit(): void {}

  // ajouter message
  onSubmit() {
    let data = {
      nom: this.nom,
      email: this.email,
      message: this.message,
    };

    this.messageService.postMessage(data).subscribe((response) => {
      console.log(response);
      this.ressourceservice.verifierChamp(
        '!',
        response.status_message,
        'success'
      );
      this.ngOnInit(); // Actualise la page
    });
  }
}
