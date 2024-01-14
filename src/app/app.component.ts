import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CanDeactivateService } from './can-deactivate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'accdemo';

  accordActiveIndex: number = 0;;

  tabs: number[] = [0, 1, 2, 3];

  constructor(
    private canDeactivateService: CanDeactivateService

  ) {
    this.canDeactivateService.changed = false;
  }

  handleAccordChange(e: MouseEvent, accordIndex: number) {
    e.stopPropagation();
    if (this.accordActiveIndex === accordIndex){
      return;
    }
    console.log(accordIndex)
    this.canChange().subscribe({
      next: (allow: boolean ) => {
        if (allow) {
          this.accordActiveIndex = accordIndex;
        }
      }
    });
  }

  canChange(): Observable<boolean> {
    return this.canDeactivateService.canDeactivateOrConfirm();
  }


  setChanged(changed: boolean) {
    this.canDeactivateService.changed = changed;
  }

}
