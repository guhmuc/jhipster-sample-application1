import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBlaMySuffix, BlaMySuffix } from 'app/shared/model/bla-my-suffix.model';
import { BlaMySuffixService } from './bla-my-suffix.service';

@Component({
  selector: 'jhi-bla-my-suffix-update',
  templateUrl: './bla-my-suffix-update.component.html'
})
export class BlaMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    foo: [],
    bar: []
  });

  constructor(protected blaService: BlaMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bla }) => {
      this.updateForm(bla);
    });
  }

  updateForm(bla: IBlaMySuffix): void {
    this.editForm.patchValue({
      id: bla.id,
      foo: bla.foo,
      bar: bla.bar
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bla = this.createFromForm();
    if (bla.id !== undefined) {
      this.subscribeToSaveResponse(this.blaService.update(bla));
    } else {
      this.subscribeToSaveResponse(this.blaService.create(bla));
    }
  }

  private createFromForm(): IBlaMySuffix {
    return {
      ...new BlaMySuffix(),
      id: this.editForm.get(['id'])!.value,
      foo: this.editForm.get(['foo'])!.value,
      bar: this.editForm.get(['bar'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBlaMySuffix>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
