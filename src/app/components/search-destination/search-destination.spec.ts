import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDestination } from './search-destination';

describe('SearchDestination', () => {
  let component: SearchDestination;
  let fixture: ComponentFixture<SearchDestination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDestination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDestination);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
