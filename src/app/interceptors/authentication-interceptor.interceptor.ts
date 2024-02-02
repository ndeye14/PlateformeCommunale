import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthenticationInterceptorInterceptor implements HttpInterceptor {

  constructor(private auth: UserService) { }
  

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // const authToken = this.auth.getToken();
    const newRequest = req.clone({
      // headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(newRequest);
  }

}
