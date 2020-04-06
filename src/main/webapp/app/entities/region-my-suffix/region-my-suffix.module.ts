import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication1SharedModule } from 'app/shared/shared.module';
import { RegionMySuffixComponent } from './region-my-suffix.component';
import { RegionMySuffixDetailComponent } from './region-my-suffix-detail.component';
import { RegionMySuffixUpdateComponent } from './region-my-suffix-update.component';
import { RegionMySuffixDeleteDialogComponent } from './region-my-suffix-delete-dialog.component';
import { regionRoute } from './region-my-suffix.route';

@NgModule({
  imports: [JhipsterSampleApplication1SharedModule, RouterModule.forChild(regionRoute)],
  declarations: [
    RegionMySuffixComponent,
    RegionMySuffixDetailComponent,
    RegionMySuffixUpdateComponent,
    RegionMySuffixDeleteDialogComponent
  ],
  entryComponents: [RegionMySuffixDeleteDialogComponent]
})
export class JhipsterSampleApplication1RegionMySuffixModule {}
