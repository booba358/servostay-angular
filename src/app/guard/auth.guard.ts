import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../modules/services/auth.service';
import { of, switchMap } from 'rxjs';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

    // Check the authentication status
    return inject(AuthService).check().pipe(
        switchMap((authenticated) =>
        {
          console.log(authenticated);
            // If the user is not authenticated...
            if ( !authenticated )
            {
                // Redirect to the sign-in page with a redirectUrl param
                const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
                const urlTree = router.parseUrl(`traveler/sign-in?${redirectURL}`);

                return of(urlTree);
            }
            
            
            // Allow the access
            return of(true);
        }),
    );
};
