import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardMainComponent } from './task-board-main.component';

describe('TaskBoardMainComponent', () => {
  let component: TaskBoardMainComponent;
  let fixture: ComponentFixture<TaskBoardMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskBoardMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBoardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
