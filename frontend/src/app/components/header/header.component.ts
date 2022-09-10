import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  private authSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSub = this.authService.isAuthetication.subscribe(value => {
        this.isAuthenticated = value;
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }

}
