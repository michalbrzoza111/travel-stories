import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
//import { MdDialogContent } from '@angular/material';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-post-dialog',
  templateUrl: './user-post-dialog.component.html',
  styleUrls: ['./user-post-dialog.component.scss']
})
export class UserPostDialogComponent implements OnInit {
  currentPostIndex;
  currentPost;
  user;


  constructor( @Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<any>) {

  }

  ngOnInit() {
    this.currentPostIndex = this.data[1];
    this.user = this.data[0];
    this.data.length = 0;
    this.currentPost = this.user.posts[this.currentPostIndex];


  }
}
