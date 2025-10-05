import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'nms-cinemas-booking';
  userName: string = ''; 
  loginSuccess: boolean = false;
  platFormId: Object = inject(PLATFORM_ID);

  constructor(private service: MoviesService) {
    if (isPlatformBrowser(this.platFormId)) {
      if (sessionStorage != null){
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

  logOut() {
    sessionStorage.clear();
    window.location.href="/login";
  }

}
