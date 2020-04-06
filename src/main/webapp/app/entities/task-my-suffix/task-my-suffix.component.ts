import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaskMySuffix } from 'app/shared/model/task-my-suffix.model';
import { TaskMySuffixService } from './task-my-suffix.service';
import { TaskMySuffixDeleteDialogComponent } from './task-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-task-my-suffix',
  templateUrl: './task-my-suffix.component.html'
})
export class TaskMySuffixComponent implements OnInit, OnDestroy {
  tasks?: ITaskMySuffix[];
  eventSubscriber?: Subscription;

  constructor(protected taskService: TaskMySuffixService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.taskService.query().subscribe((res: HttpResponse<ITaskMySuffix[]>) => (this.tasks = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTasks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITaskMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTasks(): void {
    this.eventSubscriber = this.eventManager.subscribe('taskListModification', () => this.loadAll());
  }

  delete(task: ITaskMySuffix): void {
    const modalRef = this.modalService.open(TaskMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.task = task;
  }
}
