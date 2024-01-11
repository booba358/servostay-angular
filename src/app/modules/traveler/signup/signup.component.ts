import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from '../../services/toastr.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  public signUpForm: FormGroup;
  constructor(private formBuilder: FormBuilder , private _authService : AuthService, private _toatsrService : ToastrService, private _router : Router){

  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', Validators.required],
    })
  }

  onSubmittingForm(){
    console.log(this.signUpForm.value);
    this._authService.signUp(this.signUpForm.value).subscribe({
      next: ((res: any) => {
          console.log('login res', res);
          if(res.status == true){
            this._toatsrService.success(res.message)
            this._router.navigateByUrl('/traveler/sign-in');
          }
      }),
      error: ((error: any) => {
          console.log(error);
          
      })
  })
  }

   /**
 * getter for form
 */
   get formGet(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }
}
