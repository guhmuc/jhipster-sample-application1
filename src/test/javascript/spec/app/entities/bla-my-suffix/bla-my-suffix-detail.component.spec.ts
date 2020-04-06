import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplication1TestModule } from '../../../test.module';
import { BlaMySuffixDetailComponent } from 'app/entities/bla-my-suffix/bla-my-suffix-detail.component';
import { BlaMySuffix } from 'app/shared/model/bla-my-suffix.model';

describe('Component Tests', () => {
  describe('BlaMySuffix Management Detail Component', () => {
    let comp: BlaMySuffixDetailComponent;
    let fixture: ComponentFixture<BlaMySuffixDetailComponent>;
    const route = ({ data: of({ bla: new BlaMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplication1TestModule],
        declarations: [BlaMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BlaMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BlaMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load bla on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bla).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
