import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/sesion/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  email: string = '';
  password: string = '';

  constructor(private authService: LoginService, private router: Router) {}

  onSubmit() {
    console.log(this.email);
    console.log(this.password);
    const form = {
      email: this.email,
      password: this.password,

    }

    this.authService.login(form).subscribe(
     
      (res) => {
        if (res==400)
        {
          console.log(res);
          alert("Contraseña o Email Incorrectos")
        }

        else
        {
          console.log(res);
          this.authService.setToken(res.token);
          
          localStorage.setItem('email', form.email);
          this.router.navigate(['/menu']);
          
          
        }
      },
      (err) => {
        if (err == 500)
        {
          alert("Nos encontramos en mantenimiento");
        }
      }
    );

   
    
  }
  navegar() {
    this.router.navigate(['/register']);
  }
}