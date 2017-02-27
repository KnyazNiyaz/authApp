import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import {FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  username: string;
  email: string;
  password: string;

  constructor(private validateService: ValidateService,
              private flashService: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    if(!this.validateService.validateRegister(user)){
      this.flashService.show('Fill all', {cssClass: 'alert-danger', timeout: 3000} );
      return false
    }

    if(!this.validateService.validateEmail(user.email)){
      this.flashService.show('Fill email', {cssClass: 'alert-danger', timeout: 3000} );
      return false
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashService.show('You are now registered and can log in', {cssClass: 'alert-succes', timeout: 3000} );
        this.router.navigate(['/login'])
      } else {
        this.flashService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000} );
        this.router.navigate(['/register'])
      }
    });
  }

}
