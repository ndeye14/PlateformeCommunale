import { Injectable } from '@angular/core';
import { url } from './Apiurl';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  constructor(
    private http: HttpClient
  ) {}

  // Méthode pour ajouter un newsletter
  postNewsletter(news: any): Observable<any> {
    return this.http.post<any>(`${url}/newsletter/mail`, news);
  }

  // lister des newsletters
  getAllNewsletter(): Observable<any> {
    return this.http.get<any>(`${url}/listage_mail`);
  }
}
