import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import { RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
// import { ListComponent } from './list/list.component';
// import { FormComponent } from './form/form.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { UserState } from './state/user.state';
import { WelcomeComponent } from './welcome/welcome.component';
// import { DetailComponent } from './detail/detail.component';
// import { ListModule } from './list/list.module';

@NgModule({
    declarations: [
        AppComponent,
        // ListComponent,
        // FormComponent,
         WelcomeComponent
        // DetailComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        NgxsModule.forRoot(
          [
            UserState
          ]
        ),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        // ListModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}