import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/i-user';
import { Iregister } from '../models/iregister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  loading!:boolean;
  emailRegex:RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex:RegExp = /^.{4,18}$/;
  passwordInvalid!:boolean;
  usernameExisting!:boolean;
  emailExisting!:boolean;
  registerObj!:Iregister;
  error!:boolean;

  constructor(
    private http:HttpClient,
    private authService:AuthService,
    private router:Router
  ){}

  loadingSubscription!:Subscription;
  errorSubscription!:Subscription;

  ngOnInit(){
    this.loadingSubscription = this.authService.loading$.subscribe(data => {
      this.loading = data;
    })

    this.errorSubscription = this.authService.error$.subscribe(data => {
      this.error = data;
    })
  }

  ngOnDestroy(){
    this.loadingSubscription.unsubscribe();
  }

  register(form:NgForm):void{
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

      this.registerObj = {...temporaryObj}

      console.log(this.registerObj)

      this.authService.register(this.registerObj).subscribe(data => {
        this.router.navigate(["/auth/login"])
      });
    })
  }

  resetPassword(){
    this.passwordInvalid = false;
  }

  resetEmail(){
    this.emailExisting = false;
  }

  resetUsername(){
    this.usernameExisting = false;
  }

  startLoading(){
    this.authService.startLoading();
  }

  stopLoading(){
    this.authService.stopLoading();
  }
}
