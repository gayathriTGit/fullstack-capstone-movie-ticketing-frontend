import { Component, inject, PLATFORM_ID } from '@angular/core';
import { MovieListComponent } from "../movie-list/movie-list.component";
import { MoviesService } from '../services/movies.service';
import { CommonModule , isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [MovieListComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  loginSuccess: boolean = false;
  platformId: Object = inject(PLATFORM_ID);

  constructor(private service: MoviesService) {
    if (isPlatformBrowser(this.platformId)) {
      if (sessionStorage != null){
        const login = sessionStorage.getItem('loginSuccess'); 
        this.loginSuccess = Boolean(login);
        this.service.loginSuccessful = this.loginSuccess;
      }
    }
    else {
      this.loginSuccess = this.service.loginSuccessful;
    }   
    console.log("home " + this.loginSuccess);
  }

}
