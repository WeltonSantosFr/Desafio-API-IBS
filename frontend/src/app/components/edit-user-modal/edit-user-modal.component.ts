import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ToastService } from '../../services/toast.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersComponent } from '../users/users.component';
import { DropdownModule } from 'primeng/dropdown';
import { EditUserFormData, User } from '../../types/user';


@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, CalendarModule, DropdownModule],
  providers: [ToastService],
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.css'
})
export class EditUserModalComponent {
  user: User;

  genderOptions = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' }
  ];

  maritalStatusOptions = [
    { label: 'Solteiro', value: 'Solteiro' },
    { label: 'Casado', value: 'Casado' },
    { label: 'Divorciado', value: 'Divorciado' },
    { label: 'Viúvo', value: 'Viúvo' }
  ];



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
      name: '',
      gender: '',
      birthDate: '',
      maritalStatus: ''
    }) as FormGroup & {
      controls: {
        name: FormControl
        gender: FormControl
        birthDate: FormControl
        maritalStatus: FormControl
      }
    };
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `bearer ${localStorage.getItem("@token")}`
  })

  onSubmit() {
    if(this.editUserForm.valid) {

    
    const formData: EditUserFormData = { ...this.editUserForm.value };


    Object.keys(formData).forEach(key => {
      if (formData[key] === '' || formData[key] === null || formData[key] === undefined) {
        delete formData[key];
      }
    });

    if (Object.keys(formData).length === 0) {
      this.toastService.showError("Falha ao editar usuário. Verifique os dados e tente novamente.")
      return;
    }

    this.http.patch<User>(`http://localhost:3001/user/${this.user.id}`, formData, { headers: this.headers })
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

  birthDateValidator(control: AbstractControl): {[key:string]: boolean} | null {
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
