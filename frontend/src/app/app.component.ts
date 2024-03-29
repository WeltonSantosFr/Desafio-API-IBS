import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilterMatchMode, MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  constructor(private primengConfig: PrimeNGConfig, private messageService: MessageService) { }

  showSuccessToast(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showErrorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  ngOnInit() {
    this.primengConfig.ripple = true
    this.primengConfig.zIndex = {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1100   // tooltip
    },
    this.primengConfig.filterMatchModeOptions = {
      text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
      numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
      date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
  };
  }
}