import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { url } from './Apiurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RessourceService {
  constructor(private http: HttpClient) {}

  // methode pour ajouter annonce
  ajouterRessource(ressource: any): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken
      ? this.http.post<any>(`${url}/ressource/create`, ressource, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }

  // methode pour liste des annonces
  listerRessources(): Observable<any> {
    // const accessToken = localStorage.getItem('userConnect');

    return  this.http.get<any>(`${url}/liste_ressource`, {})
      //     headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
      //   })
      // : of(null);
  }

  // methode pour supprimer une annonce
  supprimerRessource(id: number): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken
      ? this.http.delete<any>(`${url}/deleteRessource/` + id, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }

  // annonce par details
  getRessourceById(id: number): Observable<any> {
    return this.http.get<any>(`${url}/ressource/details/${id}`);
  }

  // methode pour modifier
  updateRessource(id: number, ressource: any): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');

    return accessToken
      ? this.http.put<any>(`${url}/ressource/update/` + id, ressource, {
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
