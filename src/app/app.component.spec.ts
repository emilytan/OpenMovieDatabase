import { TestBed, ComponentFixture, tick, fakeAsync, flush } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { MovieDetails } from './data-model';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  describe('searchMovie', () => {
    it('should update movies array after search', fakeAsync(() => {
      const testResponse = {
        Response: 'True',
        Search: [
          {
            imdbID: 'tt14236348',
            Title: 'The Test',
            Type: 'movie',
            Year: '2021',
            Poster: 'https://m.media-amazon.com/images/M/MV5BYzJkZWMxZjItOGEwOS00NzM2LWIzZWEtOWI5MDIwMmQxNmM5XkEyXkFqcGdeQXVyMTEzMTQzOTk2._V1_SX300.jpg',
          },
          {
            imdbID: 'tt15251490',
            Title: 'The Test',
            Type: 'movie',
            Year: '2021',
            Poster: 'N/A',
          },
        ],
      };
      const expectedUrl =
        'http://www.omdbapi.com/?s=The%20Test&y=2021&type=movie&apikey=cd7d38db';

      appComponent.movieSearch = 'The Test';
      appComponent.filterYear = '2021';
      appComponent.filterMediaType = 'movie';
      appComponent.searchMovie();

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(testResponse);

      tick();
      expect(appComponent.movies.length).toEqual(2);
      expect(appComponent.movies[0].imdbID).toEqual('tt14236348');
      expect(appComponent.movies[0].Title).toEqual('The Test');
      expect(appComponent.movies[1].imdbID).toEqual('tt15251490');
      expect(appComponent.movies[1].Title).toEqual('The Test');
    }));

    it('should set error message if fail to find movie', fakeAsync(() => {
      const testResponse = {
        Response: 'False',
        Error: 'Movie not found!',
      };

      const expectedUrl =
        'http://www.omdbapi.com/?s=Test&y=20&type=movie&apikey=cd7d38db';

      appComponent.movieSearch = 'Test';
      appComponent.filterYear = '20';
      appComponent.filterMediaType = 'movie';
      appComponent.searchMovie();

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(testResponse);

      tick();
      expect(appComponent.err).toEqual('Movie not found!');
    }));

    it('should set error message if search movie input is empty', () => {
      appComponent.movieSearch = '';
      appComponent.searchMovie();

      expect(appComponent.err).toEqual('Please enter movie name');
    });
  });

  describe('searchMovieDetails', () => {
    it('should set selectedMovie to show movie details', () => {
      const imdbID = 'tt15251490';
      const testResponse: MovieDetails = {
        imdbID: 'tt15251490',
        Title: 'The Test',
        Type: 'movie',
        Year: '2021',
        Poster: 'N/A',
      };
      const expectedUrl =
        'http://www.omdbapi.com/?i=tt15251490&apikey=cd7d38db';

      appComponent.getMovieDetails(imdbID);

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(testResponse);

      expect(appComponent.selectedMovie).toEqual(testResponse);
      expect(appComponent.showMovieDetails).toEqual(true);
      expect(appComponent.loading).toEqual(false);
      expect(appComponent.err).toEqual('');
    });

  })
})