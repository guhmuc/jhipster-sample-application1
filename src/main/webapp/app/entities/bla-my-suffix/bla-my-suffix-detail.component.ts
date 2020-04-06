import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBlaMySuffix } from 'app/shared/model/bla-my-suffix.model';

@Component({
  selector: 'jhi-bla-my-suffix-detail',
  templateUrl: './bla-my-suffix-detail.component.html'
})
export class BlaMySuffixDetailComponent implements OnInit {
  bla: IBlaMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bla }) => (this.bla = bla));
  }

  previousState(): void {
    window.history.back();
  }
}
