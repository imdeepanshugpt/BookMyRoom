import { Router } from '@angular/router';
import { LocalStorageService } from './../local-storage.service';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from '../chat.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public chat: FormGroup;
  public socket;
  public obs: Subscription;
  public messages: object[] = [];
  public userName: string;
  public rooms = [];

  constructor(
    private chatService: ChatService,
    private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit() {
    this.chat = new FormGroup({
      inputMessage: new FormControl(null, [Validators.required])
    });
    this.userName = this.localStorageService.getItem('name') ? this.localStorageService.getItem('name') : 'Anonymous';
    this.chatService.getMessages().subscribe(data => {
      this.messages.push(data);
    });
    console.log(this.obs);
  }
  sendMessage() {
    this.chatService.sendMessage({ user: this.userName, data: this.chat.value.inputMessage });
    this.chat.controls.inputMessage.reset();
  }
}
