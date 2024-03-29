import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-create-user-modal',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './create-user-modal.component.html',
  styleUrl: './create-user-modal.component.css'
})
export class CreateUserModalComponent {
  constructor(private http: HttpClient, private messageService: MessageService, private ref: DynamicDialogRef) { }

  createUserForm = new FormGroup({
    name: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    birthDate: new FormControl('', [Validators.required, this.birthDateValidator]),
    maritalStatus: new FormControl('', Validators.required)
  })

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `bearer ${localStorage.getItem("@token")}`
  })

  onSubmit() {
    if (this.createUserForm.valid) {
      this.http.post<any>('http://localhost:3001/user', this.createUserForm.value, {headers: this.headers})
        .subscribe({
          next: (response) => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário criado com sucesso!' });
            this.ref.close();
          },
          error: (error) => {
            console.error("Erro ao criar usuario", error)
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao criar usuário. Verifique os dados e tente novamente.' });
          },
        })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao criar usuário. Verifique os dados e tente novamente.' });
    }
  }

  birthDateValidator(control: any) {
    const value = control.value;

    // Verifique se o valor é uma data válida
    if (value) {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(value)) {
        return { invalidDateFormat: true };
      }

      const birthDate = new Date(value);
      const currentDate = new Date();

      // Verifique se a data de nascimento é no passado e não é muito antiga
      if (birthDate >= currentDate || birthDate.getFullYear() < 1900) {
        return { invalidBirthDate: true };
      }
    }

    return null;
  }

}
