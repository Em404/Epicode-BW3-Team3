import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  emailRegex:RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  error!:boolean;
  notExistingUser!:boolean;
  wrongPassword!:boolean;
  loading!:boolean;

  constructor(
    private authService:AuthService,
    private router:Router,
  ){}

  errorSubscription!:Subscription;
  notExistingUserSubscription!:Subscription;
  wrongPasswordSubscription!:Subscription;
  loadingSubscription!:Subscription;

  ngOnInit(){
    this.errorSubscription = this.authService.error$.subscribe(data => {
      this.error = data;
    })

    this.notExistingUserSubscription = this.authService.notExistingUser$.subscribe(data => {
      this.notExistingUser = data;
    })

    this.wrongPasswordSubscription = this.authService.wrongPassword$.subscribe(data => {
      this.wrongPassword = data;
    })

    this.loadingSubscription = this.authService.loading$.subscribe(data => {
      this.loading = data;
    })
  }

  ngOnDestroy(){
    this.errorSubscription.unsubscribe();
    this.notExistingUserSubscription.unsubscribe();
    this.wrongPasswordSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

  login(form:NgForm){
    this.resetEmail();
    this.resetPassword();
    this.authService.startLoading();
    this.authService.login(form.form.value).subscribe(data => {
      this.router.navigate(["/"]);
    })
  }

  resetEmail(){
    this.notExistingUser = false;
  }

  resetPassword(){
    this.wrongPassword = false;
  }
}
