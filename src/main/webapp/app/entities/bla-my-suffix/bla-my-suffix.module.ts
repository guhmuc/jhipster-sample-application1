import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication1SharedModule } from 'app/shared/shared.module';
import { BlaMySuffixComponent } from './bla-my-suffix.component';
import { BlaMySuffixDetailComponent } from './bla-my-suffix-detail.component';
import { BlaMySuffixUpdateComponent } from './bla-my-suffix-update.component';
import { BlaMySuffixDeleteDialogComponent } from './bla-my-suffix-delete-dialog.component';
import { blaRoute } from './bla-my-suffix.route';

@NgModule({
  imports: [JhipsterSampleApplication1SharedModule, RouterModule.forChild(blaRoute)],
  declarations: [BlaMySuffixComponent, BlaMySuffixDetailComponent, BlaMySuffixUpdateComponent, BlaMySuffixDeleteDialogComponent],
  entryComponents: [BlaMySuffixDeleteDialogComponent]
})
export class JhipsterSampleApplication1BlaMySuffixModule {}
