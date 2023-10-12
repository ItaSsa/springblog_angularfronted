import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { RegisterPayload } from '../register-payload';
import {Router} from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit{
  registerForm: FormGroup;
  registerPayload: RegisterPayload;


  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router:Router) {
    this.registerForm = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    this.registerPayload = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  ngOnInit() {
  }

  onSubmit(){
    this.registerPayload.username = this.registerForm.get('username')!.value;
    this.registerPayload.email = this.registerForm.get('email')!.value;
    this.registerPayload.password = this.registerForm.get('password')!.value;
    this.registerPayload.confirmPassword = this.registerForm.get('confirmPassword')!.value;
    this.authService.register(this.registerPayload).subscribe(
  
       {
        next: () => {
            console.log("Success");
            this.router.navigateByUrl('/register-success');
        },

        error: (e) => {
            console.error(e);
            console.log("Failed");
      
        },

        complete() {
          console.log("is completed");
        }
      }
    );

    
  
  }
    

}
