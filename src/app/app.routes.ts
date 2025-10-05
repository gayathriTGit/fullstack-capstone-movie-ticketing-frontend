import { Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieShowtimesListComponent } from './movie-showtimes-list/movie-showtimes-list.component';
import { MovieShowtimeAddComponent } from './movie-showtime-add/movie-showtime-add.component';
import { MovieBookTicketComponent } from './movie-book-ticket/movie-book-ticket.component';
import { MovieBookTicketStatusComponent } from './movie-book-ticket-status/movie-book-ticket-status.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: '', redirectTo:'login', pathMatch:'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'movies', component: MovieListComponent},
    {path: 'moviedetails', component: MovieDetailsComponent},
    {path: 'movieshowtimes', component: MovieShowtimesListComponent},
    {path: 'moviedetailsadd', component: MovieShowtimeAddComponent},
    {path: 'moviebookticket', component: MovieBookTicketComponent},
    {path: 'moviebookticketstatus', component: MovieBookTicketStatusComponent}
];