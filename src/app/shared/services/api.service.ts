import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../../environments/environment';


@Injectable()
export class ApiService {

  baseURL: string = '';
  // baseURL: string = 'http://127.0.0.1:5000';
  // baseURL: string = 'http://3.80.213.87:5000';

  private httpOptions: any = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private httpClient: HttpClient
  ) {
    this.baseURL = environment.apiURL;
  }

  checkCounterfeit(data){
    let params = new HttpParams();
    params = params.append('filename', data.filename);
    return this.httpClient.get(
      `${this.baseURL}/api/checkCounterfeit`,
      { params: params }
    )
    .toPromise()
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
  }

  getEstimatedPos(data){
    let params = new HttpParams();
    params = params.append('filename', data.filename);
    return this.httpClient.get(
      `${this.baseURL}/api/getEstimatedPos`,
      { params: params }
    )
    .toPromise()
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
  }


  getPosReportData(data){
    let params = new HttpParams();
    params = params.append('from',data.from);
    params = params.append('to',data.to);
    params = params.append('state',data.state);
    params = params.append('city',data.city);
    params = params.append('product',data.product);
    // params= params.append(data)
    return this.httpClient.get(
      `${this.baseURL}/api/getPosReportData`,
      { params: params }
    )
    .toPromise()
    .then(response => {
    return response;
    })
    .catch(err => {
      console.log(err);
    });
  }

  getStoreTrafficData(){
    return this.httpClient.get(
      `${this.baseURL}/api/getTrafficSummary`
    )
    .toPromise()
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
  }


getShelfInventoryData(){
    return this.httpClient.get(
      `${this.baseURL}/api/getShelfInventoryData`,
    )
    .toPromise()
    .then(response => {
    return response;
  })
  .catch(err => {
    console.log(err);
  });
}

  detectCorrosion1(data, type){
    var url = 'http://fr-api.affineanalytics.co.in:5001/analysenew';

    return this.httpClient.post(
      url,
      data,
      this.httpOptions
    )
    .toPromise()
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
  }

  analyseVibration(data){
    var url = "http://fr-api.affineanalytics.co.in:5005/testpost";

    return this.httpClient.post(
      url,
      data,
      this.httpOptions
    )
    .toPromise()
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
  }

  detectCorrosion2(file: File) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      var d = new Date().getTime();
      formData.append("pic", file);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", 'http://fr-api.affineanalytics.co.in:5001/analyse', true);
      xhr.send(formData);
    });
  }

  detectDamage1(data, type){
    var url = 'http://fr-api.affineanalytics.co.in:5002/analysenew';

    return this.httpClient.post(
      url,
      data,
      this.httpOptions
    )
    .toPromise()
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
  }

  detectDamage2(file: File) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      var d = new Date().getTime();
      formData.append("pic", file);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", 'http://fr-api.affineanalytics.co.in:5002/analyse', true);
      xhr.send(formData);
    });
  }

}
