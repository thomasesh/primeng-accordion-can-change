import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { defer, from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateService {
  changed: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
  ) { }

  canDeactivateOrConfirm(): Observable<boolean> {
    if (!this.changed) {
      return of(true);
    }
    return this.confirm();
  }

  confirm(): Observable<boolean> {
    return defer(() => from(new Promise<boolean>(resolve => {
      this.confirmationService.confirm({
        key: "unsavedChanges",
        header: "Unsaved Changes",
        message: "There are unsaved changes that will be lost, Do you want to proceed?",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.changed = false;
          resolve(true);
        },
        reject: () => {
          resolve(false);
        }
      });
    })));
  }
}
