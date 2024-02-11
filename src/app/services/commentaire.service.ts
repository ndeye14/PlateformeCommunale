import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { url } from './Apiurl';

@Injectable({
  providedIn: 'root',
})
export class CommentaireService {
  constructor(private http:HttpClient) {}
  // Méthode pour ajouter un commentaires
  postComments(news: any): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');

    return accessToken
      ? this.http.post<any>(`${url}/commentaire/create`, news, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }

  // lister des commentaires
  getAllNewsletter(): Observable<any> {
    return this.http.get<any>(`${url}/liste_commentaire`);
  }
}
