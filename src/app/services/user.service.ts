import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { url } from 'src/app/services/Apiurl';
import Swal from 'sweetalert2';


const API_URL = 'http://localhost:8000/api'; // URL de votre API
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  // Variable superglobale pour l'authentification
  // isAuthenticated = false;

  login(user: any) {
    return this.http.post(`${url}/userlog`, user);
    // return this.http.post(`${url}/login`, user).subscribe((reponse:any) => onSuccess(reponse))
  }

  logout() {
    const accessToken = localStorage.getItem('userConnect');

    return accessToken
      ? this.http.post<any>(
          `${url}/userlogout`,
          {},
          {
            headers: new HttpHeaders({
              Authorization: `Bearer ${accessToken}`,
            }),
          }
        )
      : of(null);
  }

  register(
    user: any
    // nom: string,
    // prenom: string,
    // email: string,
    // password: string,
  ) {
    return this.http.post(
      `${url}/userregister`,
      user
      // nom,
      // prenom,
      // email,
      // password,
    );
  }

  // verifier champ
  verifierChamp(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
  // methode pour liste des annonces
  listerUtilisateurs(): Observable<any> {
    const accessToken = localStorage.getItem('userConnect');

    return accessToken
      ? this.http.get<any>(`${url}/user_list`, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }

  modifPassword(email:any,id:number) {
     return this.http.post(`${url}/resetPassword/${id}`, email);

  }


}
