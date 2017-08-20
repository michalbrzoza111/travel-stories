import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from './../../../../services/users.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment;
  user;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.user = this.usersService
      .getUser(this.comment.authorUsername)
      .subscribe(user => this.user = user);
  }
}
