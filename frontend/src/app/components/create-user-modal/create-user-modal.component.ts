import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastService } from '../../services/toast.service';
import { CalendarModule } from 'primeng/calendar';
import { UsersComponent } from '../users/users.component';


@Component({
  selector: 'app-create-user-modal',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, CalendarModule],
  providers: [ToastService],
  templateUrl: './create-user-modal.component.html',
  styleUrl: './create-user-modal.component.css'
})
export class CreateUserModalComponent {
  constructor(
    private http: HttpClient, 
    private toastService: ToastService, 
    private ref: DynamicDialogRef,
    private usersService:UsersComponent) { }

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
      const userData = this.createUserForm.value;
      let isBirthday: boolean = false

      if (userData.birthDate) {
        const birthDateUTC = new Date(userData.birthDate );
        birthDateUTC.setHours(0,0,0,0,)
        console.log(birthDateUTC)
        const birthDate = new Date(birthDateUTC.getTime() + birthDateUTC.getTimezoneOffset() * 60000);
        console.log(birthDate)
        const currentDate = new Date();
        const nextBirthday = new Date();
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
        isBirthday = currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() === birthDate.getDate();

        this.http.post<any>('http://localhost:3001/user', this.createUserForm.value, { headers: this.headers })
          .subscribe({
            next: (response) => {
              this.toastService.showSuccess("Usuário criado com sucesso!")
              this.ref.close();

              if (isBirthday) {
                this.toastService.showInfo('Parabéns', 'Feliz aniversário!');
              } else {
                const ageDate = new Date(Date.now() - birthDate.getTime());
                const age = Math.abs(ageDate.getUTCFullYear() - 1970);
                const nextBirthday = new Date();
                nextBirthday.setFullYear(nextBirthday.getFullYear(), birthDate.getMonth(), birthDate.getDate());
                if (nextBirthday.getTime() <= Date.now()) {
                  nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
                }
                const differenceInMs = nextBirthday.getTime() - Date.now();
                const daysUntilNextBirthday = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

                this.toastService.showInfo('Info', `${age + ' anos'}, ${'próximo aniversário em: ' + daysUntilNextBirthday} dias`);
                this.usersService.getAllUsers()

              }
            },
            error: (error) => {
              console.error("Erro ao criar usuario", error)
              this.toastService.showError("Falha ao criar usuário. Verifique os dados e tente novamente.")
            },
          })
      }
      else {
        this.toastService.showError("Falha ao criar usuário. Verifique os dados e tente novamente.")
      }
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
