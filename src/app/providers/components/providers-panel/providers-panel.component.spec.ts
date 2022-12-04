import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersPanelComponent } from './providers-panel.component';

describe('ProvidersPanelComponent', () => {
  let component: ProvidersPanelComponent;
  let fixture: ComponentFixture<ProvidersPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
