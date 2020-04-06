import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication1SharedModule } from 'app/shared/shared.module';
import { LocationMySuffixComponent } from './location-my-suffix.component';
import { LocationMySuffixDetailComponent } from './location-my-suffix-detail.component';
import { LocationMySuffixUpdateComponent } from './location-my-suffix-update.component';
import { LocationMySuffixDeleteDialogComponent } from './location-my-suffix-delete-dialog.component';
import { locationRoute } from './location-my-suffix.route';

@NgModule({
  imports: [JhipsterSampleApplication1SharedModule, RouterModule.forChild(locationRoute)],
  declarations: [
    LocationMySuffixComponent,
    LocationMySuffixDetailComponent,
    LocationMySuffixUpdateComponent,
    LocationMySuffixDeleteDialogComponent
  ],
  entryComponents: [LocationMySuffixDeleteDialogComponent]
})
export class JhipsterSampleApplication1LocationMySuffixModule {}
