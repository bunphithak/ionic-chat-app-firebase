import { ROUTE } from './../../_constants/route.constant';
import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/core/models/user.interface';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.page.html',
  styleUrls: ['./tab-home.page.scss'],
})
export class TabHomePage implements OnInit {

  userInfo: UserInterface;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getUserDetail();
  }

  private async getUserDetail() {
    try {
      const userInfo = await this.authService.getUser();
      this.userInfo = userInfo;
    } catch (error) {}
  }

  async logout() {
    try {
      await this.authService.logoutUser();
      this.router.navigateByUrl('login');
    } catch (error) {}
  }

  gotoUserDetail() {
    this.navCtrl.navigateForward(ROUTE.HOME_DETAIL);
  }

}
