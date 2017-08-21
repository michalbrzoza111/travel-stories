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
    this.isDev = true;
  }

  // Get All Users
  getUsers() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users');
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

  // Get Single User
  getUser(username) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users' + '/' + username);
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

  // Add New Post
  addPost(post) {
    let username = post.authorUsername;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users' + '/' + username);
    return this.http.post(ep, post, { headers: headers })
      .map(res => res.json());
  }

  // Add New Comment
  addComment(comment) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/wall/comments');
    return this.http.post(ep, comment, { headers: headers })
      .map(res => res.json());
  }

  // Add Comment From "Post" view
  // TODO better, dry solution
  addCommentFromPost(comment) {
    let username = comment.postAuthorUsername;
    let postId = comment.postId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users' + '/' + username + '/' + postId + '/' + 'comments');
    return this.http.post(ep, comment, { headers: headers })
      .map(res => res.json());
  }

  // Add New Like
  addLike(like) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/wall/likes');
    return this.http.post(ep, like, { headers: headers })
      .map(res => res.json());
  }

  // Add like from post directly
  // TODO better, dry solution
  addLikeFromPost(like) {
    let username = like.postAuthorUsername;
    let postId = like.postId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users' + '/' + username + '/' + postId + '/' + 'likes');
    return this.http.post(ep, like, { headers: headers })
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
