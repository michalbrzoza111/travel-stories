import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-explore-card',
  templateUrl: './explore-card.component.html',
  styleUrls: ['./explore-card.component.scss']
})
export class ExploreCardComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit() {
  }

}
