import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Movie } from '../models/movies.interface';
import { MoviesService } from '../services/movies.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-add.component.html',
  styleUrl: './movie-add.component.css'
})

export class MovieAddComponent {

  loginSuccess: boolean = false;
  userName: string = '';
  platformId: Object = inject(PLATFORM_ID);

  errorMessage: String = '';
  loading: boolean = false;
  selectedFile?: File;
  uploadedUrl: string = '';

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

    async addMovie() {
    console.log("add movie button click");
    if (this.isFormValid()) {
      await this.service.addMovie(this.newMovie);
    }
    window.location.href = "/movies"
  }

  isFormValid(): boolean {
    let valid: boolean = false;
    valid = this.newMovie.name.trim() !== '' &&
      this.newMovie.length.trim() !== '' &&
      this.newMovie.rating.trim() !== '' &&
      this.newMovie.genre.trim() !== '' &&
      this.newMovie.description.trim() !== '' &&
      this.newMovie.releaseDate.trim() !== '' &&
      this.selectedFile !== null;
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
    console.log("is form valid" + valid);
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
