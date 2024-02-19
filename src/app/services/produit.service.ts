import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { url } from './Apiurl';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  constructor(private http: HttpClient) {}

  // methode pour ajouter annonce
  ajouterProduit(produit: any): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken
      ? this.http.post<any>(`${url}/produit/create`, produit, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }

  // methode pour liste des annonces
  listerProduits(): Observable<any> {
    // const accessToken = localStorage.getItem('userConnect');

    return this.http.get<any>(`${url}/listes_produit`, {})


  }

  // methode pour supprimer une annonce
  supprimerProduit(id: number): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');
    return accessToken
      ? this.http.delete<any>(`${url}/delete/` + id, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }

  // annonce par details
  getProduitById(produit: any): Observable<any> {
    return this.http.get<any>(`${url}/${produit.id}`);
  }

  // methode pour modifier
  updateProduit(id: number, produit: any): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');

    return accessToken
      ? this.http.post<any>(`${url}/produit/update/` + id,produit, {
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
      timer:1000
    });
  }
}
