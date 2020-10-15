import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    let accept = false;
    let user = JSON.parse(localStorage.getItem('user'));
    const privileges = next.data['privileges'];
    if (privileges) {
      for (let priv of privileges) {
        if (priv === user.role) {
          accept = true;
        }
      }
    }

    if(!accept) {
      this.router.navigateByUrl('/');
    }

    return accept;


  }
  
}
