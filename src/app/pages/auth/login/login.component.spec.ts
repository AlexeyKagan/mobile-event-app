import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  const AFTER_SUBMIT_TIMER = 1000;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);

    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isLoading state when submit happens', () => {
    expect(component.isLoading).toBeFalsy();
    component.onSubmit();
    expect(component.isLoading).toBeTruthy();
  });

  it('should toggle isLoading state when async in submit happens', fakeAsync(() => {
    expect(component.isLoading).toBeFalsy();
    component.onSubmit();
    expect(component.isLoading).toBeTruthy();
    tick(AFTER_SUBMIT_TIMER);
    expect(component.isLoading).toBeFalsy();
  }));

  it('should be isSuccess true when async submit is happend', fakeAsync(() => {
    expect(component.isSuccess).toBeFalsy();
    component.onSubmit();
    tick(AFTER_SUBMIT_TIMER);
    expect(component.isSuccess).toBeTruthy();
  }))

  it('navigation should be called after submit', fakeAsync(() => {
    component.onSubmit();
    tick(AFTER_SUBMIT_TIMER);
    expect(router.navigate).toHaveBeenCalled();
  }));

});
