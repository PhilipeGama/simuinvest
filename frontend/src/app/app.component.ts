import { Component, OnInit } from '@angular/core';
import { AuthService } from './pages/login/auth.service';

interface User {
  email: string
  password: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.authService.autoLogin()
  }

  
}