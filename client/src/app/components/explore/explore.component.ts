import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../services/users.service';
import {Router, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  //  providers: [UserService]
})
export class ExploreComponent implements OnInit {
  users;
  posts;
  loggedUser;

  constructor(private router: Router,
    private usersService: UsersService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = Object.keys(users).map(key => users[key]); //conveerting users object to array
      this.users = [].concat.apply([], this.users); //flatten array

      //get logged user from local storage to remove from follow suggestions
      this.loggedUser = localStorage.getItem('user');
      this.loggedUser = JSON.parse(this.loggedUser);
            console.log(this.users);
                  console.log(this.loggedUser);
      this.users = this.users.filter(user => user.username !== this.loggedUser.username);
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
      user.posts = user.posts.slice(0, 4);
      this.posts = user.posts.concat(this.posts);
    });
  }
}
