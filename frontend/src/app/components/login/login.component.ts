import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

interface LoginResponse {
  token: string;
}

/** @title Simple form field */
@Component({
  selector: 'login.component',
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.css',
  standalone: true,
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule],
  providers: [ToastService]
})




export class LoginComponent {
  
  constructor(private http: HttpClient, private router: Router, private toastService: ToastService) { }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `bearer ${localStorage.getItem("@token")}`
  })

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post<LoginResponse>('http://localhost:3001/admin/login', this.loginForm.value, {headers: this.headers})
        .subscribe({
          next: (response) => {
            localStorage.setItem("@token", response.token)
            this.toastService.showSuccess('Logado com Sucesso')
          },
          error: (error) => {
            console.error("Erro ao fazer login:", error)
            this.toastService.showError('Erro ao fazer login')
          },
          complete: () => {
            this.router.navigate(['/dashboard'])
          },
        })
    }
  }



}
