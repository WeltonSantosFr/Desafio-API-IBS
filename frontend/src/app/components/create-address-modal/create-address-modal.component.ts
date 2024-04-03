import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastService } from '../../services/toast.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsersComponent } from '../users/users.component';
import { ListboxModule } from 'primeng/listbox';
import { InputMaskModule } from 'primeng/inputmask';
import { AddressComponent } from '../address/address.component';
import { CepService } from '../../services/cep.service';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-create-address-modal',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, ListboxModule, InputMaskModule, AutoCompleteModule],
  providers: [ToastService, UsersComponent],
  templateUrl: './create-address-modal.component.html',
  styleUrl: './create-address-modal.component.css'
})
export class CreateAddressModalComponent {
  users: any[] = []
  ceps: any[] = []
  filteredUsers: any[] = [];
  filteredCeps: any[] = []
  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private ref: DynamicDialogRef,
    private usersService: UsersComponent,
    private addressService: AddressComponent,
    private cepService: CepService) { }

  createAddressForm = new FormGroup({
    cep: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    complement: new FormControl(''),
    district: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    user: new FormControl<any | null>(null, Validators.required)
  })

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `bearer ${localStorage.getItem("@token")}`
  })

  onSubmit() {
    if (this.createAddressForm.valid) {


      const formData: any = this.createAddressForm.value

      Object.keys(formData).forEach(key => {
        if (formData[key] === '' || formData[key] === null || formData[key] === undefined) {
          delete formData[key];
        }
      });
      console.log(formData)
      if (Object.keys(formData).length === 0) {
        return;
      }
      if (formData.user) {
        formData.user = formData.user.id
      }
      this.http.post('http://localhost:3001/address', formData, { headers: this.headers }).subscribe({
        next: () => {
          this.toastService.showSuccess("Endereço criado com sucesso!")
          this.addressService.getAllAddress()
          this.ref.close();
        },
        error: (error) => {
          console.error("Erro ao criar usuario", error)
          this.toastService.showError("Falha ao criar endereço. Verifique os dados e tente novamente.")
        }
      })
    }
  }

  

  filterCep(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = []
    let query = event.query;
    if(query.length === 8) {
      this.cepService.searchCep(query).subscribe({
        next: (response:any) => {
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
    this.createAddressForm.patchValue({
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

  ngOnInit() {
    this.usersService.getAllUsers()
    this.usersService.usersLoaded.subscribe((users) => {
      this.users = users;
    });
    
  }

}
