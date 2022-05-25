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
  longText = "Mussum Ipsum, cacilds vidis litro abertis. Copo furadis é disculpa de bebadis, arcu quam euismod magna.Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.Paisis, filhis, espiritis santis.Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis."


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

  show() {
    console.log(this.user)
  }


}
