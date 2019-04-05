import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  // { path: 'user/:id/edit', component: FormComponent },
  // { path: 'adduser', component: FormComponent },
  // { path: 'user/:id', component: DetailComponent },
  // { path: 'users', component: ListComponent },
  { path: 'welcome', component: WelcomeComponent },
  // { path: 'adduser', component: FormComponent },
  // { path: '**', redirectTo: 'welcome' },
  // { path: '', redirectTo: 'welcome', pathMatch: 'full' }
     { path: '', redirectTo: 'welcome', pathMatch: 'full'},
     { path: 'users', loadChildren: './list/list.module#ListModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
