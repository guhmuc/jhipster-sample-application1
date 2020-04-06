import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBlaMySuffix } from 'app/shared/model/bla-my-suffix.model';
import { BlaMySuffixService } from './bla-my-suffix.service';
import { BlaMySuffixDeleteDialogComponent } from './bla-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-bla-my-suffix',
  templateUrl: './bla-my-suffix.component.html'
})
export class BlaMySuffixComponent implements OnInit, OnDestroy {
  blas?: IBlaMySuffix[];
  eventSubscriber?: Subscription;

  constructor(protected blaService: BlaMySuffixService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.blaService.query().subscribe((res: HttpResponse<IBlaMySuffix[]>) => (this.blas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBlas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBlaMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBlas(): void {
    this.eventSubscriber = this.eventManager.subscribe('blaListModification', () => this.loadAll());
  }

  delete(bla: IBlaMySuffix): void {
    const modalRef = this.modalService.open(BlaMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.bla = bla;
  }
}
