import { inject } from "@angular/core";
import { AuthService } from "../auth.service";
import { of } from "rxjs";

export function provideGuardForPermission() {
  return () => inject(AuthService).isAuthenticated();
}