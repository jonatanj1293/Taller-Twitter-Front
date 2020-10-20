import { Twit } from './../model/twit';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TwitsServicesService {

  constructor(private http: HttpClient) { }

  public listarTweets(){
    return this.http.get(`${environment.apiUrlProd}post`);
  }
  public guardarTweet(Tweet: Twit){
    return this.http.post(`${environment.apiUrlProd}post`, Tweet);
  }
}
