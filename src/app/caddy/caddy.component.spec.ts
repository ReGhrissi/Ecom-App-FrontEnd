import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaddyComponent } from './caddy.component';

describe('CaddyComponent', () => {
  let component: CaddyComponent;
  let fixture: ComponentFixture<CaddyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaddyComponent]
    });
    fixture = TestBed.createComponent(CaddyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
