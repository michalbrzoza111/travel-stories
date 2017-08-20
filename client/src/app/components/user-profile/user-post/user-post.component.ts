import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { UsersService } from './../../../services/users.service';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})

export class UserPostComponent implements OnInit {
  currentPost;
  user;
  postsArray;
  currentUserID;
  currentPostID;
  content;
  loggedUser;
  commentContent;
  comment;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.getPostID();
    this.getUser();
    this.getLoggedUser();
  }

  getUser() {
    this.route.params
      .switchMap((params: Params) =>
        this.usersService.getUser(params['username'])
      )
      .subscribe(user => {
        this.user = user;
        this.postsArray = user.posts;
        this.currentPost = this.postsArray.find(post => post._id === this.currentPostID);
      });
  }

  getPostID() {
    this.route.params.subscribe(params => {
      this.currentPostID = params['postId'];
    })
  }

  getLoggedUser() {
    this.loggedUser = localStorage.getItem('user');
    this.loggedUser = JSON.parse(this.loggedUser);
  }

  onCommentSubmit() {
    this.comment = {
      content: this.content,
      postId: this.currentPost._id,
      postAuthorUsername: this.user.username,
      authorUsername: this.loggedUser.username,
    }
    this.uploadComment();
    this.content = '';
  }

  uploadComment() {
    this.usersService.addComment(this.comment).subscribe(data => {
      if (data.success) {
        // this.flashMessage.show('Comment added', { cssClass: 'alert-success', timeout: 3000 });
        this.updateUi();
      } else {
        // this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  updateUi() {
    this.user = this.usersService
      .getUser(this.currentPost.authorUsername)
      .subscribe(user => {
        this.user = user
        this.currentPost = this.user.posts.find(post => post._id === this.currentPost._id);
      });
  }

}
