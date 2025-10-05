import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule,  isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { BookingRequest, BookingResponse, MovieShowTime } from '../models/movies.interface';

type SeatCell = { id: number; state: '0' | '1' | '2'; label: string };

@Component({
  selector: 'app-movie-book-ticket',
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-book-ticket.component.html',
  styleUrl: './movie-book-ticket.component.css'
})

export class MovieBookTicketComponent {

  loginSuccess: boolean = false;
  platformId: Object = inject(PLATFORM_ID);

  public selectedSeatsCount: number = 0;
  public selectedSeats: string = '';
  public showTimeId: number = 0;
  public givenShowTime: MovieShowTime = {
    id: 0,
    movieId: 0,
    movieName: '',
    time: '',
    availableSeats: 0,
    price: 0,
    date: '',
    auditoriumId: 0,
    auditoriumName: '',
    seats: ''
  }
  public bookingRequest: BookingRequest = {
    movieId: 0,
    movieName: '',
    auditoriumId: 0,
    auditoriumName: '',
    noOfTickets: 0,
    showTime: '',
    noOfDrinks: 0,
    noOfPopcorns: 0,
    noOfIceCream: 0,
    noOfCandy: 0,
    baseTicketPrice: 0,
    seats: ''
  }

  public bookingResponse: BookingResponse = {
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
  }

  public availableSeatsRowA: string = '';
  public availableSeatsRowB: string = '';
  public availableSeatsRowC: string = '';
  public availableSeatsRowD: string = '';
  public availableSeatsRowE: string = '';
  public availableSeatsRowF: string = '';

  seatsRowA: SeatCell[] = [];
  seatsRowB: SeatCell[] = [];
  seatsRowC: SeatCell[] = [];
  seatsRowD: SeatCell[] = [];
  seatsRowE: SeatCell[] = [];
  seatsRowF: SeatCell[] = [];

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
    param = this.route.snapshot.queryParamMap.get('showtimeid');
    if (param !== null) {
      this.showTimeId = parseInt(param!);
    }
    this.givenShowTime = await this.service.getMovieShowTimeById(this.showTimeId);

    if (this.givenShowTime.seats.length > 0) {
      let seatsArray: string[] | undefined = this.givenShowTime.seats.split("|");
      this.availableSeatsRowA = seatsArray[0];
      this.availableSeatsRowB = seatsArray[1];
      this.availableSeatsRowC = seatsArray[2];
      this.availableSeatsRowD = seatsArray[3];
      this.availableSeatsRowE = seatsArray[4];
      this.availableSeatsRowF = seatsArray[5];

      this.seatsRowA = this.buildRow('A', this.availableSeatsRowA);
      this.seatsRowB = this.buildRow('B', this.availableSeatsRowB);
      this.seatsRowC = this.buildRow('C', this.availableSeatsRowC);
      this.seatsRowD = this.buildRow('D', this.availableSeatsRowD);
      this.seatsRowE = this.buildRow('E', this.availableSeatsRowE);
      this.seatsRowF = this.buildRow('F', this.availableSeatsRowF);
    }
  }

  private buildRow(rowLabel: string, rowString: string): SeatCell[] {
    return Array.from({ length: 15 }, (_, i) => {
      const pos = i + 1;
      const ch = rowString.charAt(pos);
      let state: '0' | '1' | '2' = '0';
      if (ch === '1') state = '1';
      else if (ch === '2') state = '2';
      return { id: pos, state, label: `${rowLabel}${pos}` };
    });
  }

  toggleSeatsRowA(seat: SeatCell): void {
    this.availableSeatsRowA = this.changeSeatStateAndRowStr(seat, 'A', this.availableSeatsRowA);
    this.givenShowTime.seats = this.availableSeatsRowA + "|" + this.availableSeatsRowB + "|" + this.availableSeatsRowC + "|" +
      this.availableSeatsRowD + "|" + this.availableSeatsRowE + "|" + this.availableSeatsRowF;
  }

  toggleSeatsRowB(seat: SeatCell): void {
    this.availableSeatsRowB = this.changeSeatStateAndRowStr(seat, 'B', this.availableSeatsRowB);
    this.givenShowTime.seats = this.availableSeatsRowA + "|" + this.availableSeatsRowB + "|" + this.availableSeatsRowC + "|" +
      this.availableSeatsRowD + "|" + this.availableSeatsRowE + "|" + this.availableSeatsRowF;
  }

  toggleSeatsRowC(seat: SeatCell): void {
    this.availableSeatsRowC = this.changeSeatStateAndRowStr(seat, 'C', this.availableSeatsRowC);
    this.givenShowTime.seats = this.availableSeatsRowA + "|" + this.availableSeatsRowB + "|" + this.availableSeatsRowC + "|" +
      this.availableSeatsRowD + "|" + this.availableSeatsRowE + "|" + this.availableSeatsRowF;
  }

  toggleSeatsRowD(seat: SeatCell): void {
    this.availableSeatsRowD = this.changeSeatStateAndRowStr(seat, 'D', this.availableSeatsRowD);
    this.givenShowTime.seats = this.availableSeatsRowA + "|" + this.availableSeatsRowB + "|" + this.availableSeatsRowC + "|" +
      this.availableSeatsRowD + "|" + this.availableSeatsRowE + "|" + this.availableSeatsRowF;
  }

  toggleSeatsRowE(seat: SeatCell): void {
    this.availableSeatsRowE = this.changeSeatStateAndRowStr(seat, 'E', this.availableSeatsRowE);
    this.givenShowTime.seats = this.availableSeatsRowA + "|" + this.availableSeatsRowB + "|" + this.availableSeatsRowC + "|" +
      this.availableSeatsRowD + "|" + this.availableSeatsRowE + "|" + this.availableSeatsRowF;
  }

  toggleSeatsRowF(seat: SeatCell): void {
    this.availableSeatsRowF = this.changeSeatStateAndRowStr(seat, 'F', this.availableSeatsRowF);
    this.givenShowTime.seats = this.availableSeatsRowA + "|" + this.availableSeatsRowB + "|" + this.availableSeatsRowC + "|" +
      this.availableSeatsRowD + "|" + this.availableSeatsRowE + "|" + this.availableSeatsRowF;
  }

  changeSeatStateAndRowStr(seat: SeatCell, rowLabel: string, rowStr: string): string {
    let seatNotation = '';

    if (seat.state === '1') return rowStr;

    if (seat.state === '2') {
      seat.state = '0';
      this.selectedSeatsCount--;
      seatNotation = '0';
      this.selectedSeats = this.selectedSeats.replace(`${seat.label}, `, ``)
    }
    else if (seat.state === '0') {
      seat.state = '2';
      seatNotation = '1';
      this.selectedSeatsCount++;
      this.selectedSeats += `${seat.label}, `;
    }
    if (seat.id > 1) {
      rowStr = rowLabel + rowStr.substring(1, seat.id) + seatNotation + rowStr.substring(seat.id + 1, rowStr.length);
    }
    else if (seat.id === 15) {
      rowStr = rowLabel + rowStr.substring(1, seat.id) + seatNotation;
    }
    else {
      rowStr = rowLabel + seatNotation + rowStr.substring(seat.id + 1, rowStr.length);
    }
    return rowStr;
  }

  async bookTickets() {
    this.bookingRequest.movieId = this.givenShowTime.movieId;
    this.bookingRequest.movieName = this.givenShowTime.movieName;
    this.bookingRequest.auditoriumId = this.givenShowTime.auditoriumId;
    this.bookingRequest.auditoriumName = this.givenShowTime.auditoriumName;
    this.bookingRequest.showTime = this.givenShowTime.time;
    this.bookingRequest.baseTicketPrice = this.givenShowTime.price;
    this.bookingRequest.noOfTickets = this.selectedSeatsCount;
    this.bookingRequest.noOfCandy = 0;
    this.bookingRequest.noOfDrinks = 0;
    this.bookingRequest.noOfIceCream = 0;
    this.bookingRequest.noOfPopcorns = 0;
    this.bookingRequest.seats = this.selectedSeats.substring(0, this.selectedSeats.length - 2);
    console.log(this.bookingRequest);
    this.bookingResponse = await this.service.createBooking(this.bookingRequest);
    await this.service.updateMovieShowTime(this.showTimeId, this.givenShowTime);
    window.location.href = "/moviebookticketstatus?bookingid=" + this.bookingResponse.bookingId;
  }

}
