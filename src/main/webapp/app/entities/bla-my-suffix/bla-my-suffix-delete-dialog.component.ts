import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBlaMySuffix } from 'app/shared/model/bla-my-suffix.model';
import { BlaMySuffixService } from './bla-my-suffix.service';

@Component({
  templateUrl: './bla-my-suffix-delete-dialog.component.html'
})
export class BlaMySuffixDeleteDialogComponent {
  bla?: IBlaMySuffix;

  constructor(protected blaService: BlaMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.blaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('blaListModification');
      this.activeModal.close();
    });
  }
}
