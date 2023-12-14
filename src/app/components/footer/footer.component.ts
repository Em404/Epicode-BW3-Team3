import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../pages/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private http:HttpClient, private authService:AuthService){}
email:string = ''
emailRegex:RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

iscriviti(){
  if (this.email && this.emailRegex.test(this.email)) {
    this.authService.newsLetter(this.email).subscribe((data )=>{

      Swal.fire({
        title: "COMPLIMENTI!",
      text: "Ti sei iscritto correttamente alla nostra Newsletter",
      showClass: {
        popup: `
        animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  })
  this.email = ''
}
Swal.fire('inserisci la tua email')
}

}
