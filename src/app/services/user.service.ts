import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserData } from './repository/user-repository/models/user-data.model';
import { UserRepositoryService } from './repository/user-repository/user-repository.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: UserData | undefined;


  constructor(private readonly auth: AuthService, private readonly userRepository: UserRepositoryService) {
    auth.authenticationStateChanged.subscribe(_ => {
      if(this.auth.isLoggedIn) {
        this.getUserData();
      } else {
        this.userData = undefined;
      }
    });
   }

   getUserData() {
    this.userRepository.getUser().subscribe({
      next: (data: UserData) => {
        this.userData = data;
      }
    })
   }
}
