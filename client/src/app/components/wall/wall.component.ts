import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import {Router, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  users;
  postsToRender = [];

  constructor(
    private router: Router,
    private usersService: UsersService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }



  ngOnInit() {
    this.usersService.getUsers().subscribe(users => {
      this.users = Object.keys(users).map(key => users[key]); //conveerting users object to array
      this.users = [].concat.apply([], this.users); //flatten array
      console.log(this.users);
      this.preparePostsToRender();
    },
      err => {
        console.log(err);
        return false;
      });
  }

  preparePostsToRender() {
    //sorting every user posts array by date
    this.users.forEach(user => {
      user.posts.sort((a, b) => {
        let dateA = +new Date(a.date), dateB = +new Date(b.date)
        return dateB - dateA;
      })
      //slicing for rendering only 4 decent posts
      this.postsToRender = this.postsToRender.concat(user.posts);
      this.sortPosts();
    });
  }

  sortPosts() {
    this.postsToRender.sort((a, b) => {
      let dateA = +new Date(a.date), dateB = +new Date(b.date)
      return dateB - dateA;
    })
  }
}
