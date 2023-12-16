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
chatUrl:string = 'https://api.openai.com/v1/chat/completions'
apyKey:string  = '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'
constructor(private http:HttpClient){}
body!:any

callChat(){
  this.loading = true
    this.body = {
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "system",
          "content": "You are a helpful assistant."
        },
        {
          "role": "user",
          "content": this.messagge || ''
        }
      ]
    }
    this.http.post<ChatResponse>(this.chatUrl,this.body,
      { headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apyKey}`
      }
      }).subscribe((data:ChatResponse) => {
        this.loading = false

        this.response = data.choices[0].message.content || ''
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
