import { Component } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge'
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface UserDataByMonth {
  [key: string]: number;
}

interface AddressDataByMonth {
  [key: string]: number;
}

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
  userChartData: any
  addressChartData: any
  totalUsers: number
  totalAddress: number

  constructor(private http: HttpClient) {
    this.totalUsers = 0
    this.totalAddress = 0
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/dashboard'] },
      { label: 'Users', icon: 'pi pi-users', routerLink: ['/user'] },
      { label: 'Address', icon: 'pi pi-building', routerLink: ['/address'] },
      { label: 'Sair', icon: 'pi pi-key', routerLink: ['/logoff'] }
    ]
    this.activeItem = this.items[0];
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `bearer ${localStorage.getItem("@token")}`
  })

  getTotalUsers(): void {
    this.http.get<[]>('http://localhost:3001/user', { headers: this.headers })
      .subscribe({
        next: (response) => {
          this.totalUsers = response.length
          this.userChartData = this.processUserData(response)
        },
        error: (error) => {
          console.error("Error:", error)
        },
      })
  }

  getTotalAddress(): void {
    this.http.get<[]>('http://localhost:3001/address', { headers: this.headers })
      .subscribe({
        next: (response) => {
          this.totalAddress = response.length
          this.addressChartData = this.processAddressData(response)
        },
        error: (error) => {
          console.error("Error:", error)
        },
      })
  }

  processUserData(users: any[]): any {
    const userDataByMonth: UserDataByMonth = {};
    users.forEach(user => {
      const createdAt = new Date(user.createdAt);
      const monthYear = `${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`;
      userDataByMonth[monthYear] = (userDataByMonth[monthYear] || 0) + 1;
    });
    return {
      labels: Object.keys(userDataByMonth),
      datasets: [{
        label: 'Usuários Cadastrados por Mês',
        data: Object.values(userDataByMonth)
      }]
    };
  }

  processAddressData(address :any[]):any {
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