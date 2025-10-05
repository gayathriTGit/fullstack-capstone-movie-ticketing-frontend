import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBookTicketComponent } from './movie-book-ticket.component';

describe('MovieBookTicketComponent', () => {
  let component: MovieBookTicketComponent;
  let fixture: ComponentFixture<MovieBookTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieBookTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieBookTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
