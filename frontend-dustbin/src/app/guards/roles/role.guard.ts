import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginService } from 'src/app/services/sesion/login.service';


@Injectable({
  providedIn: 'root'
})


export class RoleGuard implements CanActivate {
  constructor(private authService: LoginService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.getuser().pipe(
      map((user) => {
        if (!user) {
          localStorage.removeItem('token')
          window.alert('No estas logueado')
          this.router.navigate(['/chibi']).then(r => console.log(r));
          return false;
        }
        else{
          const role = 1;
          if (user.role_id === role) {
            return true;
          } else {
            this.router.navigate([`/login`]).then(r => console.log(r));
            window.alert('No tienes permisos para acceder a esta pagina')
            localStorage.removeItem('token')
            return false;
          }
        }

      })
    );
  }
  
}
