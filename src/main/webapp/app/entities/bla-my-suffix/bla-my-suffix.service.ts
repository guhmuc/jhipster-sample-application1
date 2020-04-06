import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBlaMySuffix } from 'app/shared/model/bla-my-suffix.model';

type EntityResponseType = HttpResponse<IBlaMySuffix>;
type EntityArrayResponseType = HttpResponse<IBlaMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class BlaMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/blas';

  constructor(protected http: HttpClient) {}

  create(bla: IBlaMySuffix): Observable<EntityResponseType> {
    return this.http.post<IBlaMySuffix>(this.resourceUrl, bla, { observe: 'response' });
  }

  update(bla: IBlaMySuffix): Observable<EntityResponseType> {
    return this.http.put<IBlaMySuffix>(this.resourceUrl, bla, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBlaMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBlaMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
