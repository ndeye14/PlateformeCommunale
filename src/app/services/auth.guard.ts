import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router, private http: HttpClient) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    {
      // Vérifiez si l'utilisateur est connecté
      if (this.isLogged()) {
        return true;
      } else {
        // Redirige l'utilisateur vers la page de connexion
        alert("Connectez-vous!!")
        this.route.navigate(['/login']);
        return false;
      }
    }
  }
  isLogged() {
    // Récupérez le token du stockage local
    const token = localStorage.getItem('userConnect');
    // console.log("token "+token);

    // L'utilisateur est connecté si le token est présent
    return token !== null && token.length > 0;
  }
}
