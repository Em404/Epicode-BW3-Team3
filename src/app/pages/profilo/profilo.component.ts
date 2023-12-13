import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../auth/models/i-user';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent {

  constructor(
    private route: ActivatedRoute,
    private authService:AuthService,
    private router:Router,
    private http:HttpClient,
  ){}

  loading!:boolean;
  emailRegex:RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex:RegExp = /^.{4,18}$/;
  passwordInvalid!:boolean;
  usernameExisting!:boolean;
  emailExisting!:boolean;
  error!:boolean;

  loadingSubscription!:Subscription;
  errorSubscription!:Subscription;
    userId!:number;
  user:IUser = {
    nome: '',
    cognome: '',
    username: '',
    email: '',
    password: '',
    genere: '',
    data_di_nascita: 0,
    id: 0
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
     this.authService.getUserById(params.id).subscribe((res) => {
      this.user = res;
      this.userId = params.id
      console.log(this.user);
      })
    });
  }

  update(form:NgForm) {
    const valid = form.form.value.password === form.form.value["conferma-password"];
    if (!valid) {
      this.passwordInvalid = true;
      return;
    };
    this.startLoading();
    this.http.get<IUser[]>("http://localhost:3000/users").subscribe(data => {
      if (data.some(user => user.username === form.form.value.username)) this.usernameExisting = true;
      if (data.some(user => user.email === form.form.value.email)) this.emailExisting = true;
      if (this.emailExisting || this.usernameExisting) {
        this.stopLoading();
        return;
      }
      const temporaryObj:any = {...form.form.value};
      delete temporaryObj["conferma-password"];
      this.user = {...temporaryObj}
      this.user.id = this.userId
      this.authService.updateUserInfo(this.user).subscribe(res => this.router.navigate(['/']))
    })
  }

  logout() {
    this.authService.logout()
  }

  startLoading(){
    this.authService.startLoading();
  }

  stopLoading(){
    this.authService.stopLoading();
  }

}
