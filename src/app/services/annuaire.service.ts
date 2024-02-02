import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { url } from './Apiurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { annuaire } from '../models/annuaire.model';

@Injectable({
  providedIn: 'root',
})
export class AnnuaireService {


  constructor(private http: HttpClient) {}

  // methode pour ajouter annonce
  ajouterAnnuaire(annuaire: any): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken
      ? this.http.post<any>(`${url}/annuaire/create`, annuaire, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }

  // methode pour liste des annonces
  listerAnnuaires(): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');

    return accessToken
      ? this.http.get<any>(`${url}/listes_annuaires`, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }

  // methode pour supprimer une annonce
  supprimerAnnuaire(id: number): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken
      ? this.http.delete<any>(`${url}/annuaire/` + id, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }

  // annonce par details
  getAnnuaireById(annuaire: any): Observable<any> {
    // const url = `${url}/${id}`;
    return this.http.get<any>(`${url}/${annuaire.id}`);
  }

  // methode pour modifier
  updateAnnuaire(id: number, annuaire: any): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');

    return accessToken
      ? this.http.post<any>(`${url}/annuaire/update/${id}`, annuaire,{
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
    });
  }
}
