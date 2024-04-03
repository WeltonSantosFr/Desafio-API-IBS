import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastService } from '../../services/toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateAddressModalComponent } from '../create-address-modal/create-address-modal.component';
import { EditAddressModalComponent } from '../edit-address-modal/edit-address-modal.component';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [TabMenuModule, TableModule, ButtonModule, DialogModule, InputTextModule],
  providers: [DialogService],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  items: MenuItem[]
  activeItem: any
  addressToDeleteId: string
  address:any
  confirmationDialogVisible: boolean = false;

  constructor(private http: HttpClient, private toastService: ToastService, private dialogService: DialogService) {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/dashboard'] },
      { label: 'Usuarios', icon: 'pi pi-users', routerLink: ['/users'] },
      { label: 'Endereços', icon: 'pi pi-building', routerLink: ['/address'] },
      { label: 'Sair', icon: 'pi pi-key', routerLink: ['/logoff'] }
    ]
    this.activeItem = this.items[0];
    this.addressToDeleteId = ''
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `bearer ${localStorage.getItem("@token")}`
  })


  getAllAddress(): void {
    this.http.get<[]>('http://localhost:3001/address', { headers: this.headers })
      .subscribe({
        next: (response) => {
          this.address = response
        },
        error: (error) => {
          console.error("Error:", error)
        },
      })
  }

  createAddress() {
    this.dialogService.open(CreateAddressModalComponent, {
      header: 'Adicionar Endereço',
      width: 'fit-content',
      contentStyle: { "max-height": "500px", "overflow": "auto" }
    });
  }

  editAddress(address: any) {
    this.dialogService.open(EditAddressModalComponent, {
      data: {
        address: address
      },
      header: 'Editar Endereço',
      width: 'fit-content',
      contentStyle: { "max-height": "500px", "overflow": "auto" }
    });
  }

  deleteAddressConfirmation(id: string) {
    this.addressToDeleteId = id;
    this.confirmationDialogVisible = true;
  }

  confirmDelete() {
    this.http.delete<any>(`http://localhost:3001/address/${this.addressToDeleteId}`, { headers: this.headers })
      .subscribe({
        next: () => {
          this.toastService.showSuccess("Endereço excluído com sucesso!");
          this.confirmationDialogVisible = false;
          this.getAllAddress()
        },
        error: () => {
          this.toastService.showError("Falha ao excluir endereço. Tente novamente mais tarde.");
        }
      });
  }

  cancelDelete() {
    this.confirmationDialogVisible = false;
  }

  ngOnInit() {
    this.getAllAddress()
  }
}
