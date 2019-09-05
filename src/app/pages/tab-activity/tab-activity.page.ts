import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityInterface } from 'src/app/core/models/activity.interface';
import { ActivityService } from 'src/app/core/services/activity.service.service';
import { AlertController, NavController } from '@ionic/angular';
import { ChatService } from 'src/app/core/services/chat.service';
import { UserInterface } from 'src/app/core/models/user.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-tab-activity',
  templateUrl: './tab-activity.page.html',
  styleUrls: ['./tab-activity.page.scss'],
})
export class TabActivityPage implements OnInit {
  public activity: Observable<ActivityInterface[]>;
  userInfo: UserInterface;
  constructor(
    private activityServers: ActivityService,
    public alertController: AlertController,
    private navCtrl: NavController,
    private chatService: ChatService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.activity = this.activityServers.getActivity();
    this.getCurrentUser();
  }

  async getCurrentUser() {
    this.userInfo = await this.authService.getUser();
  }

  clickJoinChat(id) {
    this.activityServers.getActivityDetail(id).subscribe(async activity => {
      if (activity) {
        const toast = await this.alertController.create({
          header: 'ต้องการเข้าร่วมกิจกรรม?',
          message: `ท่านต้องการเข้าร่วมกิจกรรม ${activity.name} ?`,
          buttons: [
            {
              text: 'ยกเลิก',
              handler: (blah) => {
              }
            },
            {
              text: 'ตกลง',
              handler: (blah) => {
                this.joinGroup(activity);
              }
            }
          ]
        });
        await toast.present();
      }
    });
  }

  joinGroup(activity) {
    const data = {
      specialMessage: true,
      message: `${this.userInfo.fullName} has joined the room`,
      groupID: activity.id,
      joinBy: this.userInfo.uid,
      status: 'active'
    };
    this.chatService.joinGroup(data);
    this.navCtrl.navigateForward(`/members/tabs/tabActivity/chat/${activity.id}`);
  }
}
