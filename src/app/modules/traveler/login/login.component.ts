import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder , private _authService : AuthService, private _router: Router){

  }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  onSubmittingForm(){
    console.log(this.signInForm.value);
    this._authService.signIn(this.signInForm.value).subscribe({
      next: ((res: any) => {
          console.log('login res', res);
          if(res.status == true){
            this._router.navigateByUrl('/traveler/dashboard')
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
    return this.signInForm.controls;
  }
}
