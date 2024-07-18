import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipDiscountsComponent } from './vip-discounts.component';

describe('VipDiscountsComponent', () => {
  let component: VipDiscountsComponent;
  let fixture: ComponentFixture<VipDiscountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VipDiscountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VipDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
