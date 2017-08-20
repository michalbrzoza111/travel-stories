import { Component, OnInit } from '@angular/core';
// import { UserDataService } from "../user-data.service"
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { UsersService } from './../../../services/users.service';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})
export class UserPostComponent implements OnInit {
  currentPostIndex;
  currentPost;
  user;
  postsArray;
  currentUserID;
  currentPostID;
  // user;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.getPostID();
    this.getUserData();


  }

  getUserData() {
    this.route.params
      .switchMap((params: Params) =>
        this.usersService.getUser(params['username'])

      )
      // .subscribe(user => this.currentPost = user.posts.find(post => post.id === this.currentPostID))
      .subscribe(user => {
        this.user = user;
        this.postsArray = user.posts;
        this.currentPost = this.postsArray.find(post => post._id === this.currentPostID );
      }
      )
  }


  getPostID() {
    this.route.params.subscribe(params => {
         this.currentPostID = params['postId'];
             console.log(this.currentPostID)
  })
}


}
