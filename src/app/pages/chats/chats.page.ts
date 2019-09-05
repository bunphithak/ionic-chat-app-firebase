import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/core/services/activity.service.service';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/core/services/chat.service';
import { UserInterface } from 'src/app/core/models/user.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  chat: string;
  activity;
  data: any = {
    receiverid: '',
    title: 'title',
    receiveridimg: ''
  };
  sender: any = {};
  conversationList: Array<any> = [];
  isChatting = false;
  userInfo: UserInterface;
  constructor(
    private activityServers: ActivityService,
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      const element = document.getElementById('box');
      element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, 400);

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getActivity(id);
      this.getChat(id);
      this.getCurrentUser();
    }
  }

  async getCurrentUser() {
    this.userInfo = await this.authService.getUser();
  }

  async getChat(id) {
    const dataChat = await this.chatService.getChat(id);
    console.log('dataChat======>', dataChat);
  }

  getActivity(id) {
    this.activityServers.getActivityDetail(id).subscribe(async activity => {
      if (activity) {
        this.activity = activity;
      }
    });
  }

  sendMessage(e) {
    if (this.chat) {
      this.chat = '';
    }
  }

}
