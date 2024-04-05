import { Component } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge'
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';
import { User } from '../../types/user';
import { AddressDataByMonth, ChartData, UserDataByMonth } from '../../types/chart-data';
import { Address } from '../../types/address';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TabMenuModule, BadgeModule, CommonModule, ChartModule],
  providers: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  items: MenuItem[]
  activeItem: MenuItem
  userChartData: ChartData = {labels: [], datasets: []}
  addressChartData: ChartData = {labels: [], datasets: []}
  totalUsers: number
  totalAddress: number

  constructor(private http: HttpClient, private toastService: ToastService) {
    this.totalUsers = 0
    this.totalAddress = 0
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/dashboard'] },
      { label: 'Usuarios', icon: 'pi pi-users', routerLink: ['/users'] },
      { label: 'Endereços', icon: 'pi pi-building', routerLink: ['/address'] },
      { label: 'Sair', icon: 'pi pi-key', routerLink: ['/login'] }
    ]
    this.activeItem = this.items[0];
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `bearer ${localStorage.getItem("@token")}`
  })

  getTotalUsers(): void {
    this.http.get<User[]>('http://localhost:3001/user', { headers: this.headers })
      .subscribe({
        next: (response) => {
          this.totalUsers = response.length
          this.userChartData = this.processUserData(response)
        },
        error: () => {
          this.toastService.showError("Erro ao adquirir dados sobre usuários")
        },
      })
  }

  getTotalAddress(): void {
    this.http.get<Address[]>('http://localhost:3001/address', { headers: this.headers })
      .subscribe({
        next: (response) => {
          this.totalAddress = response.length
          this.addressChartData = this.processAddressData(response)
        },
        error: () => {
          this.toastService.showError("Erro ao adquirir dados sobre endereços")
        },
      })
  }

  processUserData(users: User[]) {
    const userDataByMonth: UserDataByMonth = {};
    users.forEach(user => {
      const createdAt = new Date(user.createdAt);
      const monthYear = `${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`;
      userDataByMonth[monthYear] = (userDataByMonth[monthYear] || 0) + 1;
    });
    const sortedKeys = Object.keys(userDataByMonth).sort((a, b) => {
      const [aMonth, aYear] = a.split('/').map(Number);
      const [bMonth, bYear] = b.split('/').map(Number);
      if (aYear === bYear) {
        return aMonth - bMonth;
      } else {
        return aYear - bYear;
      }
    });
    return {
      labels: sortedKeys,
      datasets: [{
        label: 'Usuários Cadastrados por Mês',
        data: sortedKeys.map(key => userDataByMonth[key])
      }]
    };
  }

  processAddressData(address: Address[]) {
    const addressDataByMonth: AddressDataByMonth = {};
    address.forEach(address => {
      const createdAt = new Date(address.createdAt);
      const monthYear = `${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`;
      addressDataByMonth[monthYear] = (addressDataByMonth[monthYear] || 0) + 1;
    });
    return {
      labels: Object.keys(addressDataByMonth),
      datasets: [{
        label: 'Endereços Cadastrados por Mês',
        data: Object.values(addressDataByMonth)
      }]
    };
  }

  ngOnInit() {
    this.getTotalUsers()
    this.getTotalAddress()
  }
}