import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagComponent } from 'src/app/views/administration/tag/tag.component';

const routes: Routes = [
  { path: '', loadComponent: () => import('src/app/views/administration/tag/tag.component').then(m => m.TagComponent) },
  // { path: 'categories', loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule) },
  // { path: 'posts', loadChildren: () => import('./modules/post/post.module').then(m => m.PostModule) },
  // { path: 'users', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  // { path: 'comments', loadChildren: () => import('./modules/comment/comment.module').then(m => m.CommentModule) },
  // { path: 'roles', loadChildren: () => import('./modules/role/role.module').then(m => m.RoleModule) },
  // { path: 'permissions', loadChildren: () => import('./modules/permission/permission.module').then(m => m.PermissionModule) },
  // { path: 'settings', loadChildren: () => import('./modules/setting/setting.module').then(m => m.SettingModule) },
  // { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  // { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  // { path: 'register', loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule) },
  // { path: 'forgot-password', loadChildren: () => import('./modules/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  // { path: 'reset-password', loadChildren: () => import('./modules/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  // { path: 'verify-email', loadChildren: () => import('./modules/verify-email/verify-email.module').then(m => m.VerifyEmailModule) },
  // { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule) },
  // { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  // { path: 'about', loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule) },
  // { path: 'contact', loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
