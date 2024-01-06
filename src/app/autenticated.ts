import { AuthService } from "./services/auth.service";

export class Autenticated {
  constructor(protected auth: AuthService) {}

  get isLogged(): boolean {
    return this.auth.isLogged();
  }

  logout() {
    this.auth.logout();
  }
}
