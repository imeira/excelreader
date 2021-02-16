import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CreateDealsInCampaignRequest} from '../model/CreateDealsInCampaignRequest';


@Injectable({
  providedIn: 'root'
})
export class LoteService {
  baseURL = 'http://localhost:5000/api/lote';

  constructor(private http: HttpClient) { }

  getAllCreateDealsInCampaignRequest(): Observable<CreateDealsInCampaignRequest[]> {
    return this.http.get<CreateDealsInCampaignRequest[]>(this.baseURL);
  }

  getCreateDealsInCampaignRequestByPoupadorCPF(poupadorCPF: string): Observable<CreateDealsInCampaignRequest[]> {
    return this.http.get<CreateDealsInCampaignRequest[]>(`${this.baseURL}/getByPoupadorCPF/${poupadorCPF}`);
  }

  getCreateDealsInCampaignRequestById(id: number): Observable<CreateDealsInCampaignRequest> {
    return this.http.get<CreateDealsInCampaignRequest>(`${this.baseURL}/${id}`);
  }

  postCreateDealsInCampaignRequest(createDealsInCampaignRequest: CreateDealsInCampaignRequest) {
    return this.http.post(this.baseURL, createDealsInCampaignRequest);
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

}
