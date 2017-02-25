import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import {FlashMessagesService } from 'angular2-flash-messages';

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
              private flashService: FlashMessagesService) { }

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
  }

}
