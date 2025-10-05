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

  selectedFile?: File;
  uploadedUrl: string = '';
  errorMessage: String = '';
  loading: boolean = false;
  apiUrl: String = '';
  moviesList: Movie[] = [];

  newMovie: Movie = {
    id: 0,
    name: '',
    length: '',
    rating: '',
    genre: '',
    description: '',
    image: '',
    releaseDate: ''
  };

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

  clearForm() {

    this.newMovie = {
      id: 0,
      name: '',
      length: '',
      rating: '',
      genre: '',
      description: '',
      image: '',
      releaseDate: ''
    }
    this.loading = false;
    this.errorMessage = '';
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

  async addMovie() {
    if (this.isFormValid()) {
      await this.service.addMovie(this.newMovie);
      this.moviesList.push(this.newMovie);
    }
  }

  isFormValid(): boolean {
    let valid: boolean = false;
    valid = this.newMovie.name.trim() !== '' &&
      this.newMovie.length.trim() !== '' &&
      this.newMovie.rating.trim() !== '' &&
      this.newMovie.genre.trim() !== '' &&
      this.newMovie.description.trim() !== '' &&
      this.newMovie.releaseDate.trim() !== '' &&
      this.selectedFile === null;
    if (this.newMovie.name.trim() === '') {
      alert('Movie name cannot be empty.');
      return valid;
    }
    if (this.newMovie.length.trim() === '') {
      alert('Movie length cannot be empty.');
      return valid;
    }
    if (this.newMovie.rating.trim() === '') {
      alert('Movie rating cannot be empty.');
      return valid;
    }
    if (this.newMovie.genre.trim() === '') {
      alert('Movie genre cannot be empty.');
      return valid;
    }
    if (this.newMovie.description.trim() === '') {
      alert('Movie description cannot be empty.');
      return valid;
    }
    if (this.newMovie.releaseDate.trim() === '') {
      alert('Movie release date cannot be empty.');
      return valid;
    }
    if (this.selectedFile === null) {
      alert('Upload a Movie image.');
      return valid;
    }

    return valid;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async upload() {

    if (!this.selectedFile) {
      alert('Please choose a file first');
      return;
    }
    console.log(this.selectedFile?.name);
    const imageUrl = await this.service.upload(this.selectedFile);
    this.uploadedUrl = `${this.service.moviesApiUrl}/${imageUrl}`;
    this.newMovie.image = imageUrl;
    console.log(this.uploadedUrl);
  }

}
