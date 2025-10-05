import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auditorium, Movie, MovieShowTime } from '../models/movies.interface';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-showtime-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-showtime-add.component.html',
  styleUrl: './movie-showtime-add.component.css'
})
export class MovieShowtimeAddComponent {

  loginSuccess: boolean = false;
  userName: string = '';
  platformId: Object = inject(PLATFORM_ID);

  showTimeId: number = 0;
  auditoriumList: Auditorium[] = [];
  moviesList: Movie[] = [];
  newShowTime: MovieShowTime = {
    id: 0,
    auditoriumId: 0,
    movieId: 0,
    movieName: '',
    time: '',
    availableSeats: 0,
    price: 0.0,
    date: '',
    auditoriumName: '',
    seats: 'A000000000000000|B000000000000000|C000000000000000|D000000000000000|E000000000000000|F000000000000000'
  };

  constructor(private route: ActivatedRoute, private service: MoviesService) {
    if (isPlatformBrowser(this.platformId)) {
      if (sessionStorage != null) {
        const login = sessionStorage.getItem('loginSuccess');
        this.loginSuccess = Boolean(login);
        this.service.loginSuccessful = this.loginSuccess;
        this.userName = sessionStorage.getItem('loginUserName')!;
      }
    }
    else {
      this.loginSuccess = this.service.loginSuccessful;
    }
    this.getAllMovies();
    this.getAllAuditoriums();
  }

  ngOnInit(): void {
    let param: string | null;
    param = this.route.snapshot.queryParamMap.get('id');
    if (param !== null) {
      this.showTimeId = parseInt(param!);
    }    
    console.log(param);
    if (this.showTimeId > 0) {
      this.getMovieShowTimeById(this.showTimeId);
      let btn = document.getElementById("btnSubmit");
      if (btn) {
        btn.textContent = "Update Show Time";
      }
      let h4 = document.getElementById("title");
      if (h4) {
        h4.textContent = "Update Movie Show Time";
      }
    }
  }

  async getAllMovies() {
    this.moviesList = await this.service.getAllMovies();
  }

  async getAllAuditoriums() {
    this.auditoriumList = await this.service.getAllAuditoriums();
  }

  async getMovieShowTimeById(id: number) {
    this.newShowTime = await this.service.getMovieShowTimeById(id);
  }

  isFormValid(): boolean {

    let valid: boolean = false;
    valid = this.newShowTime.auditoriumId !== null &&
      this.newShowTime.movieId !== null &&
      this.newShowTime.date !== '' &&
      this.newShowTime.price !== 0 &&
      this.newShowTime.availableSeats !== 0 &&
      this.newShowTime.time !== '';
    if (this.newShowTime.auditoriumId === null) {
      alert('Auditorium name cannot be empty.');
      return valid;
    }
    if (this.newShowTime.movieId === null) {
      alert('Movie name cannot be empty.');
      return valid;
    }
    if (this.newShowTime.time === null) {
      alert('Show time cannot be empty.');
      return valid;
    }
    if (this.newShowTime.availableSeats === 0) {
      alert('Available seats cannot be zero.');
      return valid;
    }
    if (this.newShowTime.price === 0.0) {
      alert('Price cannot be zero.');
      return valid;
    }
    return valid;
  }

  async addorUpdateMovieShowTime() {
    if (this.isFormValid()) {
      let btn = document.getElementById("btnSubmit");
      if (btn?.textContent === "Update Show Time") {
        await this.service.updateMovieShowTime(this.showTimeId, this.newShowTime);        
      }
      else {
        await this.service.addMovieShowTime(this.newShowTime);
      }
      window.location.href = `/movieshowtimes?auditoriumid=${this.newShowTime.auditoriumId}&movieid=${this.newShowTime.movieId}`;

    }
  }

}
