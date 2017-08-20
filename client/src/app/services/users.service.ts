import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class UsersService {

  authToken: any;
  //  user: any;
  isDev: boolean;

  constructor(private http: Http) {
    this.isDev = true; // Change to false before deployment
  }

//Get All Users
  getUsers() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users');
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

  getUser(username) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users' + '/' + username);
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

//Add New Post
  addPost(post) {
    let username = post.authorUsername;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users' + '/' + username);
    return this.http.post(ep, post, { headers: headers })
      .map(res => res.json());
  }

//Add new comment

addComment(comment) {
  console.log(comment)
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let ep = this.prepEndpoint('users/wall/comments');
  return this.http.post(ep, comment, { headers: headers })
    .map(res => res.json());
}

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  prepEndpoint(ep) {
    if (this.isDev) {
      return ep;
    } else {
      return 'http://localhost:8080/' + ep;
    }
  }

}
