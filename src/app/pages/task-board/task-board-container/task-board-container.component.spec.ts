import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardContainerComponent } from './task-board-container.component';

describe('TaskBoardComponent', () => {
  let component: TaskBoardContainerComponent;
  let fixture: ComponentFixture<TaskBoardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskBoardContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBoardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
