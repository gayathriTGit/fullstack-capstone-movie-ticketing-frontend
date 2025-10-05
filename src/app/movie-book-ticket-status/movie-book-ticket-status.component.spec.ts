import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBookTicketStatusComponent } from './movie-book-ticket-status.component';

describe('MovieBookTicketStatusComponent', () => {
  let component: MovieBookTicketStatusComponent;
  let fixture: ComponentFixture<MovieBookTicketStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieBookTicketStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieBookTicketStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
