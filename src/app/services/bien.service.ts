import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { url } from './Apiurl';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BienService {
  constructor(private http: HttpClient) {}

  // methode pour ajouter annonce
  ajouterBien(bien: any): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken
      ? this.http.post<any>(`${url}/bien/create`, bien, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }

  // methode pour liste des annonces
  listerBiens(): Observable<any> {
    // const accessToken = localStorage.getItem('userConnect');

    return this.http.get<any>(`${url}/listes_bien`, {})

  }

  // methode pour supprimer une annonce
  supprimerBien(id: number): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken
      ? this.http.delete<any>(`${url}/bien/delete/` + id, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }

  // annonce par details
  getBienById(bien: any): Observable<any> {
    return this.http.get<any>(`${url}/${bien.id}`);
  }

  // methode pour modifier
  updateBien(id: number, bien: any): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');

    return accessToken
      ? this.http.post<any>(`${url}/bien/update/${id}`,bien, {
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
      timer: 1500,
    });
  }
}
