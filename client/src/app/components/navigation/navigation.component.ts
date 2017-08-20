import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  user;
  loggedUser;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  //   this.authService.getProfile().subscribe(profile => {
  //     console.log(profile)
  //     this.loggedUser = profile.user;
  //   },
  //     err => {
  //       console.log(err);
  //       return false;
  //     });
  // //

  //




  }

  navigateToProfile() {
    this.loggedUser = localStorage.getItem('user');
    this.loggedUser = JSON.parse(this.loggedUser);
    this.router.navigate([this.loggedUser.username]);
  }

  onLogoutClick() {

    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success',
      timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }

}
