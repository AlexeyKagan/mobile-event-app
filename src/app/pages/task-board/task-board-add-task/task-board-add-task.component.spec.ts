import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardAddTaskComponent } from './task-board-add-task.component';

describe('TaskBoardAddTaskComponent', () => {
  let component: TaskBoardAddTaskComponent;
  let fixture: ComponentFixture<TaskBoardAddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskBoardAddTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBoardAddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
