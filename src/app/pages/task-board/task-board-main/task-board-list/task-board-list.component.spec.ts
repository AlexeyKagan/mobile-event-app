import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardListComponent } from './task-board-list.component';

describe('TaskBoardListComponent', () => {
  let component: TaskBoardListComponent;
  let fixture: ComponentFixture<TaskBoardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskBoardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
