import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from '../list/form/form.component';
import { DetailComponent } from '../list/detail/detail.component';
import { ListComponent } from '../list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'user/details/:id', component: DetailComponent },
    { path: 'user/edit/:id', component: FormComponent },
    { path: 'adduser', component: FormComponent }
];

@NgModule({
    imports: [
      RouterModule.forChild(routes),
      ReactiveFormsModule,
      CommonModule,
      ModalModule.forRoot()
    ],
    declarations: [
        FormComponent,
        DetailComponent,
        ListComponent
    ]
})



export class ListModule {}
