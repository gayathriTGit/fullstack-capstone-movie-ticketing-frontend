import { Component, ElementRef, Input, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { Movie } from '../models/movies.interface';
import { MoviesService } from '../services/movies.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})

export class MovieListComponent {

  loginSuccess: boolean = false;
  userName: string = '';
  platformId: Object = inject(PLATFORM_ID);

  // This variable tells if the component is loaded from an admin page or not
  @Input() isAdminPage: boolean = false;
  @ViewChild('strip', { static: false }) strip!: ElementRef<HTMLDivElement>;
  title = 'Movies List';

  private cardWidth = 280;  // match your inline width
  private gapPx = 16;       // Bootstrap gap-3 ≈ 1rem → ~16px (adjust if your root font-size differs)

  apiUrl: String = '';
  moviesList: Movie[] = [];


  constructor(private service: MoviesService) {
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
    this.apiUrl = this.service.moviesApiUrl;
    this.getAllMovies();
  }



  scrollStrip(direction: number) {
    const el = this.strip.nativeElement;
    const scrollAmount = (this.cardWidth + this.gapPx) * 2; // scroll by ~2 cards per click
    el.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }

  async getAllMovies() {
    this.moviesList = await this.service.getAllMovies();
  }

  async deleteMovie(id: Number, e:Event) {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this movie?")) {
      await this.service.deleteMovie(id);
      this.moviesList = this.moviesList.filter(m => m.id !== id);
    }
  }


}
