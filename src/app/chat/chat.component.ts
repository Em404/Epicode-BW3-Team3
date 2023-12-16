import { ChatResponse } from './chat-response';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  isChatOpen = false;

  loading:boolean = false
  answer:boolean = true;
messagge:string = ''
response:string = ''
chatUrl:string = 'https://api.openai.com/v1/images/generations'
apyKey:string  = ''
constructor(private http:HttpClient){}
body!:any

callChat(){
  this.loading = true
    this.body = {
      "model": "dall-e-3",
      "prompt": this.messagge,
      "n": 1,
      "size": "1024x1024"
    }


    this.http.post<ChatResponse>(this.chatUrl,this.body,
      { headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apyKey}`
      }
      }).subscribe((data:ChatResponse) => {
        console.log(data);

        this.loading = false

        this.response = data.data[0].url || ''
        this.answer = false

      })
  }

  openChat() {
    this.isChatOpen = true;
    document.body.classList.add('is-chat-open');
  }

  closeChat() {
    this.isChatOpen = false;
    document.body.classList.remove('is-chat-open');
  }

}
