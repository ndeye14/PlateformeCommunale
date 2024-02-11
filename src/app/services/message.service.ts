import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from './Apiurl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http:HttpClient) {}

  // Méthode pour ajouter un message
  postMessage(news: any): Observable<any> {
    return this.http.post<any>(`${url}/create/message`, news);
  }

  // lister des messages
  getAllMessage(): Observable<any> {
    return this.http.get<any>(`${url}/listage_message`);
  }
}
