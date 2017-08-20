
import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from './../../../services/users.service';
import { RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'app-wall-card',
  templateUrl: './wall-card.component.html',
  styleUrls: ['./wall-card.component.scss']
})
export class WallCardComponent implements OnInit {
  @Input() post;
  user;
  content;
  loggedUser;
  comment;
  commentForm;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUser();
    this.getLoggedUser();
  }

  getUser(): void {
    this.user = this.usersService
      .getUser(this.post.authorUsername)
      .subscribe(user => {
        this.user = user
            console.log(this.user)
      });
  }

  getLoggedUser() {
    this.loggedUser = localStorage.getItem('user');
    this.loggedUser = JSON.parse(this.loggedUser);
  }

  onCommentSubmit() {
    this.comment = {
      content: this.content,
      postId: this.post._id,
      postAuthorUsername: this.user.username,
      authorUsername: this.loggedUser.username,
    }
    this.uploadComment();
    this.content='';
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
      .getUser(this.post.authorUsername)
      .subscribe(user => {
        this.user = user
        this.post = this.user.posts.find(post => post._id === this.post._id);
      });
  }
}
