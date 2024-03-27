import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
}

/** @title Simple form field */
@Component({
  selector: 'login.component',
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.css',
  standalone: true,
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule, ToastModule],
  providers: [ToastModule, MessageService]
})



export class LoginComponent {
  constructor(private http: HttpClient, private messageService:MessageService, private router:Router) { }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  async onSubmit() {
    this.http.post<LoginResponse>('http://localhost:3001/admin/login', this.loginForm.value, { responseType: 'json' })
      .subscribe({
        next: (response) => {
          localStorage.setItem("@token", response.token)
        },
        error: (error) => {
          console.error("Erro ao fazer login:", error)
        },
        complete: () => {
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Logado com Sucesso'});
          this.router.navigate(['/dashboard'])
        },
      })

  }

  
  

}
