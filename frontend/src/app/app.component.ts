import { Component } from '@angular/core';

interface User {
  email: string
  password: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  user: User = {
    email: 'teste@gmail.com',
    password: 'senha123'
  }


  logged: boolean = true;

  constructor() {

  }

  
}