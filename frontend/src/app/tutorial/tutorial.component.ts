import { Component, OnInit } from '@angular/core';

interface Hero {
  name: string
}

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  hero: Hero = {
    name: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

}
