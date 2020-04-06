import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplication1TestModule } from '../../../test.module';
import { BlaMySuffixComponent } from 'app/entities/bla-my-suffix/bla-my-suffix.component';
import { BlaMySuffixService } from 'app/entities/bla-my-suffix/bla-my-suffix.service';
import { BlaMySuffix } from 'app/shared/model/bla-my-suffix.model';

describe('Component Tests', () => {
  describe('BlaMySuffix Management Component', () => {
    let comp: BlaMySuffixComponent;
    let fixture: ComponentFixture<BlaMySuffixComponent>;
    let service: BlaMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplication1TestModule],
        declarations: [BlaMySuffixComponent]
      })
        .overrideTemplate(BlaMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BlaMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BlaMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new BlaMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.blas && comp.blas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
