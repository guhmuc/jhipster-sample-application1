import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { DepartmentMySuffixService } from './department-my-suffix.service';
import { DepartmentMySuffixDeleteDialogComponent } from './department-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-department-my-suffix',
  templateUrl: './department-my-suffix.component.html'
})
export class DepartmentMySuffixComponent implements OnInit, OnDestroy {
  departments?: IDepartmentMySuffix[];
  eventSubscriber?: Subscription;

  constructor(
    protected departmentService: DepartmentMySuffixService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.departmentService.query().subscribe((res: HttpResponse<IDepartmentMySuffix[]>) => (this.departments = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDepartments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDepartmentMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDepartments(): void {
    this.eventSubscriber = this.eventManager.subscribe('departmentListModification', () => this.loadAll());
  }

  delete(department: IDepartmentMySuffix): void {
    const modalRef = this.modalService.open(DepartmentMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.department = department;
  }
}
