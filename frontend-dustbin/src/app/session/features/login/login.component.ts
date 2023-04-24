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
    const form = {
      email: this.email,
      password: this.password,

    }

    this.authService.login(form).subscribe(
      (res) => {
        if (res.status == 400) {
          alert('Usuario o contraseña incorrectos');
       
      } else {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/aMenu']);
      }
    },
    );

   
    
  }
  navegar() {
    this.router.navigate(['/register']);
  }
}