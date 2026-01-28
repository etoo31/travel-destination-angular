import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationTable } from './destination-table';

describe('DestinationTable', () => {
  let component: DestinationTable;
  let fixture: ComponentFixture<DestinationTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
