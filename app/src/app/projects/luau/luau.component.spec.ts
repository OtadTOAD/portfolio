import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuauComponent } from './luau.component';

describe('LuauComponent', () => {
  let component: LuauComponent;
  let fixture: ComponentFixture<LuauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
