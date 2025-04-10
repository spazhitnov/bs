import { inject } from "@angular/core";
import { AuthService } from "../auth.service";

export function provideGuardForPermission() {
  return () => inject(AuthService).isAuthenticated();
}