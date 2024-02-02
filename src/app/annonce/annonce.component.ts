import { Component } from '@angular/core';
import { AuthGuard } from '../services/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css'],
})
export class AnnonceComponent {
  constructor(private router: Router, private authGuard: AuthGuard) {}
}
