import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'bla-my-suffix',
        loadChildren: () => import('./bla-my-suffix/bla-my-suffix.module').then(m => m.JhipsterSampleApplication1BlaMySuffixModule)
      },
      {
        path: 'region-my-suffix',
        loadChildren: () => import('./region-my-suffix/region-my-suffix.module').then(m => m.JhipsterSampleApplication1RegionMySuffixModule)
      },
      {
        path: 'country-my-suffix',
        loadChildren: () =>
          import('./country-my-suffix/country-my-suffix.module').then(m => m.JhipsterSampleApplication1CountryMySuffixModule)
      },
      {
        path: 'location-my-suffix',
        loadChildren: () =>
          import('./location-my-suffix/location-my-suffix.module').then(m => m.JhipsterSampleApplication1LocationMySuffixModule)
      },
      {
        path: 'department-my-suffix',
        loadChildren: () =>
          import('./department-my-suffix/department-my-suffix.module').then(m => m.JhipsterSampleApplication1DepartmentMySuffixModule)
      },
      {
        path: 'task-my-suffix',
        loadChildren: () => import('./task-my-suffix/task-my-suffix.module').then(m => m.JhipsterSampleApplication1TaskMySuffixModule)
      },
      {
        path: 'employee-my-suffix',
        loadChildren: () =>
          import('./employee-my-suffix/employee-my-suffix.module').then(m => m.JhipsterSampleApplication1EmployeeMySuffixModule)
      },
      {
        path: 'job-my-suffix',
        loadChildren: () => import('./job-my-suffix/job-my-suffix.module').then(m => m.JhipsterSampleApplication1JobMySuffixModule)
      },
      {
        path: 'job-history-my-suffix',
        loadChildren: () =>
          import('./job-history-my-suffix/job-history-my-suffix.module').then(m => m.JhipsterSampleApplication1JobHistoryMySuffixModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterSampleApplication1EntityModule {}
