import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { Movie, MovieShowTime } from '../models/movies.interface';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})

export class MovieDetailsComponent {

  loginSuccess: boolean = false;
  platformId: Object = inject(PLATFORM_ID);

  movieId: Number = 0;
  movie: Movie = {
    id: 0,
    name: '',
    length: '',
    rating: '',
    genre: '',
    description: '',
    image: '',
    releaseDate: ''
  };
  showTimes: MovieShowTime[] = [];

  apiUrl: String = '';

  constructor(private route: ActivatedRoute, private service: MoviesService) {
    if (isPlatformBrowser(this.platformId)) {
      if (sessionStorage != null) {
        const login = sessionStorage.getItem('loginSuccess');
        this.loginSuccess = Boolean(login);
        this.service.loginSuccessful = this.loginSuccess;
      }
    }
    else {
      this.loginSuccess = this.service.loginSuccessful;
    }
    this.apiUrl = this.service.moviesApiUrl;
  }

  ngOnInit(): void {
    let param: string | null;
    param = this.route.snapshot.queryParamMap.get('id');
    if (param !== null) {
      this.movieId = parseInt(param!);
    }
    this.getMovieById(this.movieId);
    this.getShowTimeByMovieId(this.movieId);
  }

  async getMovieById(id: Number) {
    this.movie = await this.service.getMovieById(id);
  }

  async getShowTimeByMovieId(movieId: Number) {
    this.showTimes = await this.service.getShowTimeByMovieId(movieId);
  }

}
