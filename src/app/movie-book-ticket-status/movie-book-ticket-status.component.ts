import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingResponse } from '../models/movies.interface';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-book-ticket-status',
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-book-ticket-status.component.html',
  styleUrl: './movie-book-ticket-status.component.css'
})
export class MovieBookTicketStatusComponent {

  loginSuccess: boolean = false;
  platformId: Object = inject(PLATFORM_ID);

  bookingId: number = 0;
  bookingResponse: BookingResponse = {
    bookingId: 0,
    movieId: 0,
    movieName: '',
    auditoriumId: 0,
    auditoriumName: '',
    noOfTickets: 0,
    showTime: '',
    totalPrice: 0,
    status: '',
    seats: ''
  };

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

  }

  async ngOnInit(): Promise<void> {

    let param: string | null;
    param = this.route.snapshot.queryParamMap.get('bookingid');
    if (param !== null) {
      this.bookingId = parseInt(param!);
    }
    this.bookingResponse = await this.service.getBookingById(this.bookingId);
  }

}
