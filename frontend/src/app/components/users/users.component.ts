import { Component, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ButtonModule } from 'primeng/button'
import { DialogService } from 'primeng/dynamicdialog';
import { CreateUserModalComponent } from '../create-user-modal/create-user-modal.component';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { ToastService } from '../../services/toast.service';
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext';
import { User } from '../../types/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TabMenuModule, TableModule, ButtonModule, DialogModule, InputTextModule],
  providers: [DialogService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  items: MenuItem[]
  activeItem: MenuItem
  users: User[] = []
  confirmationDialogVisible: boolean = false;
  userToDeleteId: string;
  usersLoaded: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient, private dialogService: DialogService, private toastService: ToastService) {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/dashboard'] },
      { label: 'Usuarios', icon: 'pi pi-users', routerLink: ['/users'] },
      { label: 'Endereços', icon: 'pi pi-building', routerLink: ['/address'] },
      { label: 'Sair', icon: 'pi pi-key', routerLink: ['/login']}
    ]
    this.activeItem = this.items[0];
    this.userToDeleteId = ''
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `bearer ${localStorage.getItem("@token")}`
  })

   getAllUsers(): void {
    this.http.get<User[]>('http://localhost:3001/user', { headers: this.headers })
      .subscribe({
        next: (response) => {
          this.users = response
          this.usersLoaded.emit(this.users)
        },
        error: (error) => {
          this.toastService.showError("Erro ao adquirir dados sobre usuários")
        },
      })
  }

  editUser(user: User) {
    this.dialogService.open(EditUserModalComponent, {
      data: {
        user: user
      },
      header: 'Editar Usuário',
      width: 'fit-content',
      contentStyle: { "max-height": "500px", "overflow": "auto" }
    });
  }

  deleteUserConfirmation(id: string) {
    this.userToDeleteId = id;
    this.confirmationDialogVisible = true;
  }

  confirmDelete() {
    this.http.delete<string>(`http://localhost:3001/user/${this.userToDeleteId}`, { headers: this.headers })
      .subscribe({
        next: () => {
          this.toastService.showSuccess("Usuário excluído com sucesso!");
          this.confirmationDialogVisible = false;
          this.getAllUsers()
        },
        error: () => {
          this.toastService.showError("Falha ao excluir usuário. Tente novamente mais tarde.");
        }
      });
  }

  cancelDelete() {
    this.confirmationDialogVisible = false;
  }

  createUser() {
    this.dialogService.open(CreateUserModalComponent, {
      header: 'Adicionar Usuário',
      width: 'fit-content',
      contentStyle: { "max-height": "500px", "overflow": "auto" }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() + (offset * 60 * 1000)); 
    const day = localDate.getDate().toString().padStart(2, '0');
    const month = (localDate.getMonth() + 1).toString().padStart(2, '0'); 
    const year = localDate.getFullYear().toString();
    return `${day}-${month}-${year}`;
}

  ngOnInit() {
    this.getAllUsers()
  }
}
