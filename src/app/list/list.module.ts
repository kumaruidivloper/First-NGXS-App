import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from '../form/form.component';
import { DetailComponent } from '../detail/detail.component';
import { ListComponent } from '../list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { ModalModule } from 'ngx-bootstrap';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'user/:id/details', component: DetailComponent },
    { path: 'user/:id/edit', component: FormComponent },
    { path: 'adduser', component: FormComponent },
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