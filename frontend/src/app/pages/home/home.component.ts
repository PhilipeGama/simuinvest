import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service'
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;
  user: User;

  userEmail = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
      this.userEmail = user.email;
      this.isAuthenticated = true;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }


}
