import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private messageService: MessageService) {}

  showMessage(
    message: string,
    severity: 'success' | 'warn' | 'info' | 'error' = 'warn'
  ) {
    this.messageService.add({
      severity: severity,
      summary: severity === 'success' ? 'Éxito' : 'Advertencia',
      detail: message,
      life: 3000,
    });
  }
}
