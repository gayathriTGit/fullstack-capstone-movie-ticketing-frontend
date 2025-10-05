import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auditorium, Movie, MovieShowTime } from '../models/movies.interface';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-showtimes-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-showtimes-list.component.html',
  styleUrl: './movie-showtimes-list.component.css'
})

export class MovieShowtimesListComponent {

  loginSuccess: boolean = false;
  userName: string = '';
  platformId: Object = inject(PLATFORM_ID);

  auditoriumList: Auditorium[] = [];
  moviesList: Movie[] = [];
  movieShowTimes: MovieShowTime[] = [];
  selectedMovieId: number | null = null;
  selectedAuditoriumId: number | null = null;

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
    param = this.route.snapshot.queryParamMap.get('auditoriumid');
    if (param !== null) {
      this.selectedAuditoriumId = parseInt(param!);
    }
    param = this.route.snapshot.queryParamMap.get('movieid');
    if (param !== null) {
      this.selectedMovieId = parseInt(param!);
    }    
    if (this.selectedAuditoriumId! > 0 && this.selectedMovieId! > 0 ) {
      this.getShowTimesByAuditoriumAndMovieId(this.selectedAuditoriumId!, this.selectedMovieId!);
    }
  }

  async getAllMovies() {
    this.moviesList = await this.service.getAllMovies();
  }

  async getAllAuditoriums() {
    this.auditoriumList = await this.service.getAllAuditoriums();
  }

  async getShowTimesByAuditoriumId(theaterId: Number){
    this.movieShowTimes = await this.service.getShowTimeByAuditoriumId(theaterId);
  }

  async getShowTimesByMovieId(movieId: Number){
    this.movieShowTimes = await this.service.getShowTimeByMovieId(movieId);
  }

  async getShowTimesByAuditoriumAndMovieId(theaterId: Number, movieId: Number){
    this.movieShowTimes = await this.service.getShowTimeByAuditoriumAndMovieId(theaterId, movieId);
  }

  selectionChanged(){
    if (this.selectedAuditoriumId! > 0 && this.selectedMovieId! > 0 ){
      this.getShowTimesByAuditoriumAndMovieId(this.selectedAuditoriumId!, this.selectedMovieId!);
    } else if (this.selectedAuditoriumId! > 0) {
      this.getShowTimesByAuditoriumId(this.selectedAuditoriumId!);
    } else if (this.selectedMovieId! > 0 ){
      this.getShowTimesByMovieId(this.selectedMovieId!);
    }
  }

  async deleteShowTime(id: Number){
    await this.service.deleteMovieShowTime(id);
  }
}
