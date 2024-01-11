import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ApiResponseInterface, LoginInterface, SignUpInterface } from 'src/app/interfaces/common.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }
  private _authenticated: boolean = false;

   // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

   /**
   * signIn
   * @param{LoginInterface} loginData
   * @return{ApiResponseInterface}Observable
   */
   signIn(loginData: LoginInterface): Observable<ApiResponseInterface> {
    // Throw error, if the user is already logged in
    if ( this._authenticated )
    {
        return throwError('User is already logged in.');
    }else{
      const response = this.http.post<ApiResponseInterface>(`${environment.API_BASE_URL}login`, loginData, { headers: { skip: 'true' } });
            response.subscribe({
            next: ((res: any) => {
                console.log('login res', res);
                if(res.status == true){
                 // Store the access token in the local storage
                  this.accessToken = res.data.token;

                    // Set the authenticated flag to true
                  this._authenticated = true;

                }
            }),
            error: ((error: any) => {
                console.log(error);
                
            })
        });
        return response;
    }
  }

   /**
   * signUp
   * @param{LoginInterface} signupData
   * @return{ApiResponseInterface}Observable
   */
   signUp(signupData: SignUpInterface): Observable<ApiResponseInterface> {
    return this.http.post<ApiResponseInterface>(`${environment.API_BASE_URL}register`, signupData, { headers: { skip: 'true' } });
  }

  /**
     * Check the authentication status
     */
  check(): Observable<boolean>
  {
      // Check if the user is logged in
      if ( this._authenticated )
      {
          return of(true);
      }

      // Check the access token availability
      if ( !this.accessToken )
      {
        return of(false);
      }else{
        return of(true);
      }
  }

  /**
     * Sign out
     */
  signOut(): Observable<any>
  {
      // Remove the access token from the local storage
      localStorage.removeItem('accessToken');

      // Set the authenticated flag to false
      this._authenticated = false;

      // Return the observable
      return of(true);
  }
}
