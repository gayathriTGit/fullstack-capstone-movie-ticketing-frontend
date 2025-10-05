import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieShowtimeAddComponent } from './movie-showtime-add.component';

describe('MovieShowtimeAddComponent', () => {
  let component: MovieShowtimeAddComponent;
  let fixture: ComponentFixture<MovieShowtimeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieShowtimeAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieShowtimeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
