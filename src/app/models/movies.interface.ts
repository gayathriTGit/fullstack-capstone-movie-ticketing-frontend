export interface Movie{
    id: number,
    name: string,
    length: string,
    rating: string,
    genre: string,
    description: string,
    image: string,
    releaseDate: string
}

export interface MovieShowTime {
    id: number,
    movieId: number,
    movieName: string,
    time: string,
    availableSeats: number,
    price: number,
    date: string,
    auditoriumId: number,
    auditoriumName: string,
    seats: string
}

export interface Auditorium {
    id: number,
    name: string,
    features: string
}

export interface BookingRequest {
    movieId: number,
    movieName: string,
    auditoriumId: number,
    auditoriumName: string,
    noOfTickets: number,
    showTime: string,
    noOfDrinks: number,
    noOfPopcorns: number,
    noOfIceCream: number,
    noOfCandy: number,
    baseTicketPrice: number,
    seats: string
}

export interface BookingResponse {
    bookingId: number,
    movieId: number,
    movieName: string,
    auditoriumId: number,
    auditoriumName: string,
    noOfTickets: number,
    showTime: string,
    totalPrice: number,
    status: string,
    seats: string
 }