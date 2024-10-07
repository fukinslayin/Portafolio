import { CanDeactivateFn } from '@angular/router';
import { FormComponent } from '../interfaces/form.interface';
import { ConfirmationService } from 'primeng/api';
import { inject } from '@angular/core';
import { FormService } from '../services/form.service';

export const formGuard: CanDeactivateFn<FormComponent> = (component) => {
  const confirmationService = inject(ConfirmationService);
  const formService = inject(FormService);

  if (formService.isFormIncomplete()) {
    return new Promise<boolean>((resolve) => {
      confirmationService.confirm({
        message:
          'Tienes campos sin completar. ¿Estás seguro de que quieres salir?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => resolve(true),
        reject: () => resolve(false),
      });
    });
  }

  return true;
};
