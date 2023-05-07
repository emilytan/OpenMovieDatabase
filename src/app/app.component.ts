import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, Subscription, throwError } from 'rxjs';
import { MovieDetails } from './data-model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  title: string  = 'The Open Movie Database';
  url: string  = 'http://www.omdbapi.com/'
  apiKey: string  = '&apikey=cd7d38db';
  err : string = '';
  loading: boolean = false;
  showMovieDetails: boolean  = false;
  subscription!: Subscription;

  movieSearch: string = '';
  filterYear: string  = '';
  filterMediaType: string  = '';
  movies: any[] = [];
  selectedMovie: MovieDetails = {};

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInIt(): void {
    this.movieSearch = '';
  }
  
  ngOnDestroy(): void  {
    this.subscription?.unsubscribe();
  }


  searchMovie() {
    if (!this.movieSearch) {
      this.err = 'Please enter movie name';
      return;
    }

    this.err = '';
    this.movies = [];
    this.showMovieDetails = false;
    this.loading = true;

    const searchParams = new HttpParams()
      .set('s', this.movieSearch)
      .set('y', this.filterYear)
      .set('type', this.filterMediaType);

    const url = this.url + '?' + searchParams + this.apiKey;

    this.subscription = this.http.get(url).subscribe({
      next: (response: any) => {
        if (response.Response === 'True') {
          this.movies = response.Search;
        } else {
          this.err = response.Error;
        }
      },
      error: (error: any) => {
        this.err = error;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  getMovieDetails(imdbID: string) {
    this.err = '';
    this.loading = true;
    const url = this.url + '?i=' + imdbID + this.apiKey;

    this.subscription = this.http.get(url).subscribe({
      next: (response: MovieDetails) => {
        this.selectedMovie = response;
        this.showMovieDetails = true;
      },
      error: (error: any) => {
        this.err = error;
      },
      complete: () => {
        this.loading = false;
      }
    });

  }

}
