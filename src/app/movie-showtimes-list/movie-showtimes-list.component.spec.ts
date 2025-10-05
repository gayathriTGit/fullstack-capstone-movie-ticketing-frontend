import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieShowtimesListComponent } from './movie-showtimes-list.component';

describe('MovieShowtimesListComponent', () => {
  let component: MovieShowtimesListComponent;
  let fixture: ComponentFixture<MovieShowtimesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieShowtimesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieShowtimesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
