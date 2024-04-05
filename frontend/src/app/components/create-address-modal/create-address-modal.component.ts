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
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { Cep, CreateAddressFormData } from '../../types/address';
import { User } from '../../types/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-address-modal',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, ListboxModule, InputMaskModule, AutoCompleteModule, DropdownModule, CommonModule],
  providers: [ToastService, UsersComponent],
  templateUrl: './create-address-modal.component.html',
  styleUrl: './create-address-modal.component.css'
})
export class CreateAddressModalComponent {
  users: User[] = []
  ceps: Cep[] = []
  filteredCeps: Cep[] = []
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
  }) as FormGroup & {
    controls: {
      cep: FormControl
      address: FormControl
      number: FormControl
      complement: FormControl
      districy: FormControl
      state: FormControl
      city: FormControl
      user: FormControl
    }
  };

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `bearer ${localStorage.getItem("@token")}`
  })

  onSubmit() {
    if (this.createAddressForm.valid) {
      const formData: CreateAddressFormData = this.createAddressForm.value
      Object.keys(formData).forEach(key => {
        if (formData[key] === '' || formData[key] === null || formData[key] === undefined) {
          delete formData[key];
        }
      });
      if (Object.keys(formData).length === 0) {
        return;
      }
      this.http.post('http://localhost:3001/address', formData, { headers: this.headers }).subscribe({
        next: () => {
          this.toastService.showSuccess("Endereço criado com sucesso!")
          this.addressService.getAllAddress()
          this.ref.close();
        },
        error: () => {
          this.toastService.showError("Falha ao criar endereço. Verifique os dados e tente novamente.")
        }
      })
    } else {
      this.toastService.showError("Falha ao criar endereço. Verifique os dados e tente novamente.")
    }
  }

  filterCep(event: AutoCompleteCompleteEvent) {
    let filtered: Cep[] = []
    let query = event.query;
    if (query.length === 8) {
      this.cepService.searchCep(query).subscribe({
        next: (response: Cep) => {
          this.filteredCeps = [response]
        },
        error: () => {
          this.toastService.showError("Falha ao buscar cep. Verifique os dados e tente novamente.")
        }
      })
    }
    this.filteredCeps = filtered;
  }

  onSelectCep(event: AutoCompleteSelectEvent) {
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

  ngOnInit() {
    this.usersService.getAllUsers()
    this.usersService.usersLoaded.subscribe((users) => {
      this.users = users;
    });

  }

}
