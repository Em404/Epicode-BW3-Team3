import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../auth/models/i-user';
import { NgForm } from '@angular/forms';

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
    // private http:HttpClient,
  ){}

  loading!:boolean;
  emailRegex:RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex:RegExp = /^.{4,18}$/;
  passwordInvalid!:boolean;
  usernameExisting!:boolean;
  emailExisting!:boolean;
  // registerObj!:Iregister;
  error!:boolean;

  // loadingSubscription!:Subscription;
  // errorSubscription!:Subscription;

  user!:IUser

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
     this.authService.getUserById(params.id).subscribe((res) => {
      this.user = res;
      console.log(res);
      })
    });
  }

  update(form:NgForm) {
    this.authService.updateUserInfo(this.user).subscribe(res => this.router.navigate(['/']))
  }

  logout() {
    this.authService.logout()
  }

}
