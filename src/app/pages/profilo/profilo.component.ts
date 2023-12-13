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
      })
    });
  }

  update(form:NgForm) {
    const valid = form.form.value.password === form.form.value["conferma-password"];
    if (!valid) {
      this.passwordInvalid = true;
      return;
    };

    if (!form.form.value.nome) form.form.value.nome = this.user.nome;
    if (!form.form.value.cognome) form.form.value.cognome = this.user.cognome;
    if (!form.form.value.username) form.form.value.username = this.user.username;
    if (!form.form.value.email) form.form.value.email = this.user.email;
    if (!form.form.value.password) form.form.value.password = this.user.password;
    if (!form.form.value.genere) form.form.value.genere = this.user.genere;
    form.form.value.id = this.user.id;
    console.log(form.form.value)
    this.startLoading();
    this.http.get<IUser[]>("http://localhost:3000/users").subscribe(data => {
      this.usernameExisting = data.some(user => user.username === form.form.value.username) && (form.form.value.username !== this.user.username)

      this.emailExisting = data.some(user => user.email === form.form.value.email) && (form.form.value.email !== this.user.email);
      if (this.emailExisting || this.usernameExisting) {
        this.stopLoading();
        return;
      }
      const temporaryObj:any = {...form.form.value};
<<<<<<< HEAD
      delete temporaryObj["conferma-password"];
      this.user = {...temporaryObj}
      this.user.id = this.userId
      this.authService.updateUserInfo(this.user).subscribe(res => this.router.navigate(['/']))
=======

      delete temporaryObj["conferma-password"];
      this.user = {...temporaryObj}
      console.log(this.user)

      this.authService.updateUserInfo(this.user).subscribe(res => {
        console.log(res);

        this.user = res
        this.router.navigate(['/'])
      })
>>>>>>> d91b1c435b9c538a0e82e0a6f52b98e663399f4b
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
