import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ButtonModule } from 'primeng/button'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateUserModalComponent } from '../create-user-modal/create-user-modal.component';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TabMenuModule, TableModule, ButtonModule],
  providers: [DialogService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  items: MenuItem[]
  activeItem: MenuItem
  users: any

  constructor(private http: HttpClient, private dialogService: DialogService) {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/dashboard'] },
      { label: 'Usuarios', icon: 'pi pi-users', routerLink: ['/users'] },
      { label: 'Endereços', icon: 'pi pi-building', routerLink: ['/address'] },
      { label: 'Sair', icon: 'pi pi-key', routerLink: ['/logoff'] }
    ]
    this.activeItem = this.items[0];
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `bearer ${localStorage.getItem("@token")}`
  })

  getAllUsers(): void {
    this.http.get<[]>('http://localhost:3001/user', { headers: this.headers })
      .subscribe({
        next: (response) => {
          this.users = response
        },
        error: (error) => {
          console.error("Error:", error)
        },
      })
  }

  openUserModal() {
    const ref = this.dialogService.open(CreateUserModalComponent, {
      header: 'Adicionar Novo Usuário',
      width: 'fit-content',
      contentStyle: { "max-height": "500px", "overflow": "auto" }
    });

    // Se desejar, você pode adicionar lógica para lidar com o resultado do modal
    ref.onClose.subscribe((result) => {
      console.log(result)
    });
  }

  ngOnInit() {
    this.getAllUsers()
  }
}
