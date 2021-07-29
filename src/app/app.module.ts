import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginformComponent } from './login/loginform/loginform.component';
import { MaterialsModule } from './modules/material/materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule} from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CreateMemberComponent } from './member/create-member/create-member.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ViewMemberComponent } from './member/view-member/view-member/view-member.component';
import { LanguageService } from './services/language.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth/auth.service';
import { ToolbarComponent } from './toolbar/toolbar/toolbar.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { CreateSubscriptionComponent } from './subscription/create-subscription/create-subscription/create-subscription.component';
import { ViewSubscriptionComponent } from './subscription/view-subscription/view-subscription/view-subscription.component';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar/topbar.component';
import { ToastrModule } from 'ngx-toastr';
import { ToggleComponent } from './toggle/toggle/toggle.component';
import { LinksComponent } from './sidebar/links/links/links.component';
import { MobilenavComponent } from './navbar/mobile-navbar/mobilenav/mobilenav.component';
import { CalenderComponent } from './shared/controls/calender/calender/calender.component';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    CreateMemberComponent,
    DashboardComponent,
    ViewMemberComponent,
    ToolbarComponent,
    CreateSubscriptionComponent,
    ViewSubscriptionComponent,
    SidebarComponent,
    TopbarComponent,
    ToggleComponent,
    LinksComponent,
    MobilenavComponent,
    CalenderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableExporterModule,
    ToastrModule.forRoot(),

    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  providers: [LanguageService,AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
