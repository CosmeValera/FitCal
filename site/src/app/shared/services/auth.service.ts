import { User } from "@shared/interfaces/userInterface";

export class AuthService {
  private loggedInKey = 'loggedIn';
  private userKey = 'user';

  constructor() {
    this.loggedIn = localStorage.getItem(this.loggedInKey) === 'true';
    const userString = localStorage.getItem(this.userKey);
    if (userString) {
      this.user = JSON.parse(userString);
    } else {
      this.user = null;
    }
  }

  loggedIn: boolean = false;
  user: User | null = null;

  login(user: User) {
    this.loggedIn = true;
    this.user = user;
    localStorage.setItem(this.loggedInKey, 'true');
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  logout() {
    this.loggedIn = false;
    this.user = null;
    localStorage.setItem(this.loggedInKey, 'false');
    localStorage.removeItem(this.userKey);
  }

  isAuthenticated() {
    return this.loggedIn;
  }

  getUser() {
    return this.user;
  }

  saveUser(user: User) {
    this.user = user;
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
}
