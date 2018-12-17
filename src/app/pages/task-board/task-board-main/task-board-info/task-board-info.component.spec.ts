import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardInfoComponent } from './task-board-info.component';

describe('TaskBoardInfoComponent', () => {
  let component: TaskBoardInfoComponent;
  let fixture: ComponentFixture<TaskBoardInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskBoardInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBoardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
