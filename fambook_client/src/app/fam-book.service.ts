import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from './schema/result';
import { Feed } from './schema/feed';
import { HttpClientHelperService } from './http-client-helper.service';
import { Comment } from './schema/comment';
import { Action } from './schema/action';
import { Person } from './schema/person';
import { Relation } from './schema/relation';

const httpOptions = {
  headers: new HttpHeaders({
    //'Content-Type':'application/json',
    'Accept': 'application/json, text/plain, */*',
  }),
  'withCredentials': false
};
@Injectable({
  providedIn: 'root'
})
export class FamBookService {

  constructor(private httpClient: HttpClientHelperService) { }


  getTimelineFeeds(id: number): Observable<Result<Feed[]>> {
    return this.httpClient.get<Feed[]>("http://localhost:8081/service/timelinefeed/" + id);
  }
  getFeeds(id: number): Observable<Result<Feed[]>> {
    return this.httpClient.get<Feed[]>("http://localhost:8081/service/feed/" + id);
  }
  getMyAddedFamilyMembers(): Observable<Result<Person[]>> {
    return this.httpClient.get<Person[]>("http://localhost:8081/service/members");
  }
  getComments(feedId: number): Observable<Result<Comment[]>> {
    return this.httpClient.get<Comment[]>("http://localhost:8081/service/comment/" + feedId);
  }

  getChildren(parentId: number): Observable<Result<Person[]>> {
    return this.httpClient.get<Person[]>("http://localhost:8081/service/loadchildren?id=" + parentId);
  }
  getParent(childId: number): Observable<Result<Person>> {
    return this.httpClient.get<Person>("http://localhost:8081/service/loadparent?id=" + childId);
  }
  getRelations(id: number): Observable<Result<Relation[]>> {
    return this.httpClient.get<Relation[]>("http://localhost:8081/service/relation?id=" + id);
  }
  postComment(comment: Comment): Observable<Result<Comment>> {
    //var params = {"feedId":feedId,"comment":comment,"replyCommentId":0};
    return this.httpClient.post<Comment>("http://localhost:8081/service/comment", comment);
  }
  postFeedBK(status: string, images: File[]): Observable<Result<Feed>> {
    let params = { "content": status, "sharedLevel": 2, "files": images };
    const formData = new FormData();
    formData.append("content", status);
    formData.append("sharedLevel", "2");
    formData.append("files", images[0]);

    return this.httpClient.post<Feed>("http://localhost:8081/service/postnewfeed", params);
  }
  postFeed(status: string, images: File[]): Observable<Result<Feed>> {
    const formData = new FormData();
    if (images != undefined)
      formData.append("file", images[0]);
    else
      formData.append("file", null);
    if (status != undefined)
      formData.append("content", status);
    else
      formData.append("content", "");
    formData.append("sharedLevel", "2");

    return this.httpClient.post<Feed>("http://localhost:8081/service/postnewfeed", formData);
  }
  postUpdateProfile(data: FormData):Observable<Result<Person>>{
    return this.httpClient.post<Person>("http://localhost:8081/service/editprofile", data);
  }
  postAddProfile(data: FormData):Observable<Result<Person>>{
    return this.httpClient.post<Person>("http://localhost:8081/service/addprofile", data);
  }
  postLike(feedId: string): Observable<Result<Action>> {
    const formData = new FormData();
    formData.append("feedId ", feedId);
    return this.httpClient.post<Action>("http://localhost:8081/service/like", formData);
  }



  getMyFamilyTree(): Observable<Result<Person>> {
    return this.httpClient.get<Person>("http://localhost:8081/service/getmyfamily");
  }
}