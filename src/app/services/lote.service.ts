import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CreateDealsInCampaignRequest } from '../model/CreateDealsInCampaignRequest';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  baseURL = 'http://localhost:52188/api/v1/campaign/{idCampaign}/deals';

  constructor(private http: HttpClient) {
    // TODO definir
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
  }

  getAllCreateDealsInCampaignRequest(): Observable<CreateDealsInCampaignRequest[]> {
    return this.http.get<CreateDealsInCampaignRequest[]>(this.baseURL);
  }

  getCreateDealsInCampaignRequestByPoupadorCPF(poupadorCPF: string): Observable<CreateDealsInCampaignRequest[]> {
    return this.http.get<CreateDealsInCampaignRequest[]>(`${this.baseURL}/getByPoupadorCPF/${poupadorCPF}`);
  }

  getCreateDealsInCampaignRequestById(id: number): Observable<CreateDealsInCampaignRequest> {
    return this.http.get<CreateDealsInCampaignRequest>(`${this.baseURL}/${id}`);
  }

  validateCreateDealsInCampaignRequest(model: CreateDealsInCampaignRequest): Observable<CreateDealsInCampaignRequest> {
    console.log('XXXXXX LoteService.validateCreateDealsInCampaignRequest createDealsInCampaignRequest', model);
    return this.http.post<CreateDealsInCampaignRequest>(this.baseURL, model, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  postCreateDealsInCampaignRequest(array: CreateDealsInCampaignRequest[]): Observable<CreateDealsInCampaignRequest> {
    console.log('XXXXXX LoteService.postCreateDealsInCampaignRequest createDealsInCampaignRequest', array);
    return this.http.post<CreateDealsInCampaignRequest>(this.baseURL, array, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  putCreateDealsInCampaignRequest(createDealsInCampaignRequest: CreateDealsInCampaignRequest) {
    return this.http.put(`${this.baseURL}/${createDealsInCampaignRequest.id}`, createDealsInCampaignRequest);
  }

  deleteCreateDealsInCampaignRequest(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  postUpload(file: File, name: string) {
    const fileToUplaod = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUplaod, name);

    return this.http.post(`${this.baseURL}/upload`, formData);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  getSchema(): any {
    return [
      {
        'nameexcel': 'coluna1',
        'nametable': 'Coluna 1',
        'isreadOnly': 'true'

      },
      {
        'nameexcel': 'coluna2',
        'nametable': 'Coluna 2',
        'isreadOnly': 'false'
      },
      {
        'nameexcel': 'coluna3',
        'nametable': 'Coluna 3',
        'isreadOnly': 'false'
      },
      {
        'nameexcel': 'coluna4',
        'nametable': 'Coluna 4',
        'isreadOnly': 'false'
      },
      {
        'nameexcel': 'coluna5',
        'nametable': 'Coluna 5',
        'isreadOnly': 'false'
      }
    ];
  }

}
