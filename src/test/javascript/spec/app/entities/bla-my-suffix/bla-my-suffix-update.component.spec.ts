import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplication1TestModule } from '../../../test.module';
import { BlaMySuffixUpdateComponent } from 'app/entities/bla-my-suffix/bla-my-suffix-update.component';
import { BlaMySuffixService } from 'app/entities/bla-my-suffix/bla-my-suffix.service';
import { BlaMySuffix } from 'app/shared/model/bla-my-suffix.model';

describe('Component Tests', () => {
  describe('BlaMySuffix Management Update Component', () => {
    let comp: BlaMySuffixUpdateComponent;
    let fixture: ComponentFixture<BlaMySuffixUpdateComponent>;
    let service: BlaMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplication1TestModule],
        declarations: [BlaMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BlaMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BlaMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BlaMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BlaMySuffix(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new BlaMySuffix();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
