import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { UserDataService } from "./user-data.service"
import { UserPostDialogComponent } from './user-post-dialog/user-post-dialog.component'
import {MdDialog} from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { UserService } from './../../services/user.service';

declare const filestack: {
  init(apiKey: string): {
    pick({ maxFiles }: { maxFiles: number }):
      Promise<{ filesUploaded: { url: string }[] }>
  }
};

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  users;
  loggedUser;
  data;
  userData;
  post;
  imageUrl;
  currentWindowWidth = window.innerWidth;
  mobileBreakpoint = 993;
  isMobileLayoutActive = (this.currentWindowWidth < this.mobileBreakpoint);
  @Input() user;

  uploadedFileUrls: string[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private userDataService: UserDataService,
    public dialog: MdDialog,
    public ngZone: NgZone,
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
  ) {
    window.onresize = (e) => {
      ngZone.run(() => {
        this.currentWindowWidth = window.innerWidth;
        this.isMobileLayoutActive = (this.currentWindowWidth < this.mobileBreakpoint);
      });
    }
  }

  ngOnInit() {
    this.getUser();
    this.loggedUser = localStorage.getItem('user');
    this.loggedUser = JSON.parse(this.loggedUser);
  }

  async showPicker() {
    const client = filestack.init('AdniN18uYQZCeAC0rvoPkz');
    const result = await client.pick({ maxFiles: 1 });
    this.imageUrl = result.filesUploaded[0].url;
    this.uploadPost();
  }

  uploadPost() {
    this.post = {
      authorUsername: this.user.username,
      authorAvatar: this.user.avatar,
      imgUrl: this.imageUrl,
      smallImgUrl: this.imageUrl,
    }
    this.usersService.addPost(this.post).subscribe(data => {
      if (data.success) {
        // this.flashMessage.show('Post added', { cssClass: 'alert-success', timeout: 3000 });
        this.getUser();
      } else {
        // this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  getUser() {
    this.route.params
      .switchMap((params) => this.usersService.getUser(params['username']))
      .subscribe(user => {
        this.user = user
      });
  }

  goBack(): void {
    this.location.back();
  }

}

  // openDialog(postIndex) {
  //   this.data.push(this.user, postIndex);
  //   let dialogRef = this.dialog.open(UserPostDialogComponent, {
  //     data: this.data,
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.selectedOption = result;
  //   });
  // }
