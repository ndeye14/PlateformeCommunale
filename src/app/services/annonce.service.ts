
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { url } from './Apiurl';
import { annonce } from '../models/annonce.model';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class AnnonceService {
  constructor(private http: HttpClient) {}

  // methode pour ajouter annonce
  ajouterAnnonce(annonce: any): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken
      ? this.http.post<any>(`${url}/annonce/create`, annonce, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }

  // methode pour liste des annonces
  listerAnnonces(): Observable<any> {
    // const accessToken = localStorage.getItem('userConnect');

    return this.http.get<any>(`${url}/liste_annonce`, {


    })
  }

  // methode pour supprimer une annonce
  supprimerAnnonce(id: number): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken
      ? this.http.delete<any>(`${url}/annonce/` + id, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }

  // annonce par details
  getAnnonceById(id: number): Observable<any> {
    // const url = `${url}/${id}`;
    return this.http.get<any>(`${url}/annonce/details/${id}`);
  }



  // methode pour modifier
  updateAnnonce(id: number, annonce: any): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');

    return accessToken
      ? this.http.post<any>(`${url}/annonce/update/${id}`, annonce, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }

  // verifier champ
  verifierChamp(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      timer: 1000,
    });
  }
}
