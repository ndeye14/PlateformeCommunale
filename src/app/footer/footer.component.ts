import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NewsletterService } from '../services/newsletter.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private newsletterService: NewsletterService,
    private userService: UserService
  ) {}
  email!: string;
  // inscrire newsletter
  onSubmit() {
    let data = {
      email: this.email,
    };
    this.newsletterService.postNewsletter(data).subscribe((response) => {
      console.log(response);
      this.userService.verifierChamp(
        'inscrit!',
         response.status_message,
        'success'
      );
      // this.ngOnInit(); // Actualise la page
    });
  }
}
