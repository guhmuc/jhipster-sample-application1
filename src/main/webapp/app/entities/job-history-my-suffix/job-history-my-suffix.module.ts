import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication1SharedModule } from 'app/shared/shared.module';
import { JobHistoryMySuffixComponent } from './job-history-my-suffix.component';
import { JobHistoryMySuffixDetailComponent } from './job-history-my-suffix-detail.component';
import { JobHistoryMySuffixUpdateComponent } from './job-history-my-suffix-update.component';
import { JobHistoryMySuffixDeleteDialogComponent } from './job-history-my-suffix-delete-dialog.component';
import { jobHistoryRoute } from './job-history-my-suffix.route';

@NgModule({
  imports: [JhipsterSampleApplication1SharedModule, RouterModule.forChild(jobHistoryRoute)],
  declarations: [
    JobHistoryMySuffixComponent,
    JobHistoryMySuffixDetailComponent,
    JobHistoryMySuffixUpdateComponent,
    JobHistoryMySuffixDeleteDialogComponent
  ],
  entryComponents: [JobHistoryMySuffixDeleteDialogComponent]
})
export class JhipsterSampleApplication1JobHistoryMySuffixModule {}
