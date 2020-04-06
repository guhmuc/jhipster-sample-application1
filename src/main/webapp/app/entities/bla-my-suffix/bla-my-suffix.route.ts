import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBlaMySuffix, BlaMySuffix } from 'app/shared/model/bla-my-suffix.model';
import { BlaMySuffixService } from './bla-my-suffix.service';
import { BlaMySuffixComponent } from './bla-my-suffix.component';
import { BlaMySuffixDetailComponent } from './bla-my-suffix-detail.component';
import { BlaMySuffixUpdateComponent } from './bla-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class BlaMySuffixResolve implements Resolve<IBlaMySuffix> {
  constructor(private service: BlaMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBlaMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((bla: HttpResponse<BlaMySuffix>) => {
          if (bla.body) {
            return of(bla.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BlaMySuffix());
  }
}

export const blaRoute: Routes = [
  {
    path: '',
    component: BlaMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Blas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BlaMySuffixDetailComponent,
    resolve: {
      bla: BlaMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Blas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BlaMySuffixUpdateComponent,
    resolve: {
      bla: BlaMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Blas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BlaMySuffixUpdateComponent,
    resolve: {
      bla: BlaMySuffixResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Blas'
    },
    canActivate: [UserRouteAccessService]
  }
];
