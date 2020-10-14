import { Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Directive } from '@angular/core';
import { AuthService } from './auth.service';
import { Role } from './enums/role';

@Directive({
  selector: '[appUserRole]'
})
export class AppRolesDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef
  ) { }

  userRoles: Role[];

  @Input()
  set appUserRole(roles: Role[]) {
    if (!roles || !roles.length) {
      throw new Error('Roles value is empty or missed');
    }

    this.userRoles = roles;
  }


  ngOnInit(): void {
    let hasAccess = false;

    if (this.authService.isUserLoggedIn() && this.userRoles) {
        hasAccess = this.userRoles.some(r => this.authService.hasRole(r));
    }

    if (hasAccess) {
        this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
        this.viewContainer.clear();
    }
}

}
