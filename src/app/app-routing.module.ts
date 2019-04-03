import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: 'user/:id/edit', component: FormComponent },
  { path: 'adduser', component: FormComponent },
  { path: 'user/:id', component: DetailComponent },
  { path: 'users', component: ListComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'adduser', component: FormComponent },
  { path: '**', redirectTo: 'welcome' },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
