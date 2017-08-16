import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { HttpModule } from '@angular/http';

import { DataAccessService } from './data-access.service';
import { BookMainComponent } from './book-main/book-main.component'
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BookViewComponent } from './book-view/book-view.component';

const appRoutes: Routes = [
    

  { path: 'details/:name', component: BookMainComponent },
  { path: 'view/:name/:id', component: BookViewComponent },
  { 
        path: '', 
		component: HomePageComponent
    },
  { path: '**', redirectTo: '' }
//  { path: 'results', component: CrisisListComponent }
  ]
@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    FooterBarComponent,
    BookMainComponent,
    HomePageComponent,
    BookViewComponent
  ],
  imports: [
	RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule, HttpModule
  ],
  exports: [ RouterModule ],
  providers: [ DataAccessService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
