import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { Full_ROUTES } from './shared/routes/full-layout.routes';

import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { AdminLoginComponent } from './login/admin/login.component';
import {UpdatepasswordComponent} from './login/updatepassword/updatepassword.component';

import { AdminAuthGuard } from './shared/auth/admin/auth-guard.service';
import { AdminNotAuthGuard } from './shared/auth/admin/not-auth.service';

const appRoutes: Routes = [
  {
      path: '',
      component: FullLayoutComponent,
      data: { title: 'full Views' },
      children: Full_ROUTES,
   },
   {
      path: 'admin',
      loadChildren: './admin/admin.module#AdminModule',
      canActivate: [AdminAuthGuard]
   },
   {
      path: 'a/login',
      component: AdminLoginComponent,
      canActivate: [AdminNotAuthGuard]
   },
    {
        path: 'changepassword',
        component: UpdatepasswordComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
