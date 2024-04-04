import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ToastService } from '../../services/toast.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersComponent } from '../users/users.component';


@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, CalendarModule],
  providers: [ToastService],
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.css'
})
export class EditUserModalComponent {
  user: any;


  constructor(
    private http: HttpClient,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private toastService: ToastService,
    private fb: FormBuilder,
    private usersService: UsersComponent) {
    this.user = this.config.data.user;
  }

  editUserForm = new FormGroup({
    name: new FormControl(''),
    gender: new FormControl(''),
    birthDate: new FormControl('', this.birthDateValidator),
    maritalStatus: new FormControl('')
  })

  ngOnInit(): void {
    this.editUserForm = this.fb.group({
      name: [''],
      gender: [''],
      birthDate: [''],
      maritalStatus: ['']
    });
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `bearer ${localStorage.getItem("@token")}`
  })

  onSubmit() {
    if(this.editUserForm.valid) {

    
    const formData: any = { ...this.editUserForm.value };


    Object.keys(formData).forEach(key => {
      if (formData[key] === '' || formData[key] === null || formData[key] === undefined || formData[key].trim() === '') {
        delete formData[key];
      }
    });

    if (Object.keys(formData).length === 0) {
      this.toastService.showError("Falha ao editar usuário. Verifique os dados e tente novamente.")
      return;
    }

    this.http.patch<any>(`http://localhost:3001/user/${this.user.id}`, formData, { headers: this.headers })
      .subscribe({
        next: () => {
          this.toastService.showSuccess("Usuário editado com sucesso!")
          this.usersService.getAllUsers()
          this.ref.close();
        },
        error: () => {
          this.toastService.showError("Falha ao editar usuário. Verifique os dados e tente novamente.")
        },
      })
    }
  }

  birthDateValidator(control: any) {
    const value = control.value;

    if (value) {
      const regex = /^\d{2}-\d{2}-\d{4}$/;
      if (regex.test(value)) {
        return { invalidDateFormat: true };
      }

      const birthDate = value;
      const currentDate = new Date();

      if (birthDate >= currentDate || birthDate.getFullYear() < 1900) {
        return { invalidBirthDate: true };
      }
    }
    return null;
  }

}
