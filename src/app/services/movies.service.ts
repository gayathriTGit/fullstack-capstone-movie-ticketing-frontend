import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Auditorium, BookingRequest, BookingResponse, Movie, MovieShowTime } from '../models/movies.interface';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  public moviesApiUrl = 'http://localhost:9000/api/movies';
  public showTimesApiUrl = 'http://localhost:9000/api/movieshowtimes';
  public auditoriumsApiUrl = 'http://localhost:9000/api/auditoriums';
  public bookingApiUrl = 'http://localhost:9000/api/bookings';
  public loginSuccessful: boolean = false;
  public loginUserName: string = '';
  public loginPassword: string = '';
  public useSession: boolean = false;

  constructor(private http: HttpClient) { }

  async getAllMovies(): Promise<Movie[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.get<Movie[]>(this.moviesApiUrl, { headers })
    );
  }

  async getMovieById(id: Number): Promise<Movie> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.get<Movie>(`${this.moviesApiUrl}/${id}`, { headers })
    );
  }

  async addMovie(movie: Movie): Promise<Movie> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.post<Movie>(this.moviesApiUrl, movie, { headers })
    );
  }

  async deleteMovie(id: Number): Promise<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.delete<void>(`${this.moviesApiUrl}/${id}`, { headers })
    );
  }

  async getMovieShowTimeById(id: number):Promise<MovieShowTime>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(`${this.showTimesApiUrl}/${id}`);
    return await firstValueFrom(
      this.http.get<MovieShowTime>(`${this.showTimesApiUrl}/${id}`, { headers })
    );
  }

  async getShowTimeByMovieId(movieId: Number):Promise<MovieShowTime[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.get<MovieShowTime[]>(`${this.showTimesApiUrl}/movies/${movieId}`, { headers })
    );
  }

  async getShowTimeByAuditoriumId(theaterId: Number):Promise<MovieShowTime[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.get<MovieShowTime[]>(`${this.showTimesApiUrl}/auditoriums/${theaterId}`, { headers })
    );
  }

  async getShowTimeByAuditoriumAndMovieId(theaterId: Number, movieId: Number):Promise<MovieShowTime[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.get<MovieShowTime[]>(`${this.showTimesApiUrl}/auditoriums/${theaterId}/movies/${movieId}`, { headers })
    );
  }

   async addMovieShowTime(showTime: MovieShowTime): Promise<MovieShowTime> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.post<MovieShowTime>(this.showTimesApiUrl, showTime, { headers })
    );
  }

  async updateMovieShowTime(id: Number, showTime: MovieShowTime): Promise<MovieShowTime>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.put<MovieShowTime>(`${this.showTimesApiUrl}/${id}`, showTime, { headers })
    );
  } 

  async deleteMovieShowTime(id: Number): Promise<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.delete<void>(`${this.showTimesApiUrl}/${id}`, { headers })
    );
  }

  async getAllAuditoriums(): Promise<Auditorium[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.get<Auditorium[]>(this.auditoriumsApiUrl, { headers })
    );
  }

  async upload(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await firstValueFrom(
      this.http.post<{ url: string }>(`${this.moviesApiUrl}/upload`, formData)
    );
    return res.url;
  }

  async createBooking(bookingRequest: BookingRequest) :Promise<BookingResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await firstValueFrom(
      this.http.post<BookingResponse>(`${this.bookingApiUrl}/create`, bookingRequest, { headers })
    );
  }

  async getBookingById(id: number):Promise<BookingResponse>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(`${this.bookingApiUrl}/${id}`);
    return await firstValueFrom(
      this.http.get<BookingResponse>(`${this.bookingApiUrl}/${id}`, { headers })
    );
  }

}
