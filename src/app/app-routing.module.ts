import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { DeleteComponent } from './components/delete/delete.component';
import { EditComponent } from './components/edit/edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard]} ,
  { path: 'create', component: CreateComponent},
  { path: 'edit', component: EditComponent, canActivate: [AuthGuard]},
  { path: 'delete', component: DeleteComponent,  canActivate: [AuthGuard]} ,
  { path: 'perfil', component: ProfileComponent,  canActivate: [AuthGuard]} ,
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule, ],
  exports: [RouterModule, ]

})
export class AppRoutingModule { }
