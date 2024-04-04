import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsersComponent } from '../users/users.component';
import { AddressComponent } from '../address/address.component';
import { CepService } from '../../services/cep.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { InputMaskModule } from 'primeng/inputmask';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-edit-address-modal',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, ListboxModule, InputMaskModule, AutoCompleteModule],
  providers: [ToastService, UsersComponent],
  templateUrl: './edit-address-modal.component.html',
  styleUrl: './edit-address-modal.component.css'
})
export class EditAddressModalComponent {
  users: any[] = []
  ceps: any[] = []
  filteredUsers: any[] = [];
  filteredCeps: any[] = []
  address: any;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private usersService: UsersComponent,
    private addressService: AddressComponent,
    private cepService: CepService) { 
      this.address = this.config.data.address;
    }

  editAddressForm = new FormGroup({
    cep: new FormControl(''),
    address: new FormControl(''),
    number: new FormControl(''),
    complement: new FormControl(''),
    district: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    user: new FormControl<any | null>(null)
  })

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `bearer ${localStorage.getItem("@token")}`
  })

  onSubmit() {
    if (this.editAddressForm.valid) {
      const formData: any = this.editAddressForm.value

      Object.keys(formData).forEach(key => {
        if (formData[key] === '' || formData[key] === null || formData[key] === undefined) {
          delete formData[key];
        }
      });
      console.log(formData)
      if (Object.keys(formData).length === 0) {
        this.toastService.showError("Falha ao editar endereço. Verifique os dados e tente novamente.")
        return;
      }
      if (formData.user) {
        formData.user = formData.user.id
      }
      this.http.patch(`http://localhost:3001/address/${this.address.id}`, formData, { headers: this.headers }).subscribe({
        next: () => {
          this.toastService.showSuccess("Endereço editado com sucesso!")
          this.addressService.getAllAddress()
          this.ref.close();
        },
        error: (error) => {
          console.error("Erro ao criar usuario", error)
          this.toastService.showError("Falha ao editar endereço. Verifique os dados e tente novamente.")
        }
      })
    }
  }

  filterCep(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = []
    let query = event.query;
    if (query.length === 8) {
      this.cepService.searchCep(query).subscribe({
        next: (response: any) => {
          this.filteredCeps = [response]
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
    this.filteredCeps = filtered;
  }

  onSelectCep(event: any) {
    console.log(event)
    const selectedCep = event.value;
    this.editAddressForm.patchValue({
      cep: selectedCep.cep.replace("-", ""),
      address: selectedCep.logradouro,
      complement: selectedCep.complemento,
      district: selectedCep.bairro,
      city: selectedCep.localidade,
      state: selectedCep.uf
    });
  }

  filterUser(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = []
    let query = event.query;
    for (let i = 0; i < (this.users as any[]).length; i++) {
      let user = (this.users as any[])[i];
      if (user.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(user);
      }
    }
    console.log(filtered)
    this.filteredUsers = filtered;
  }
}
