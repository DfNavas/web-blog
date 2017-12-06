import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent }      from './user/user.component';
import { HomeComponent }      from './home/home.component';

const routes: Routes = [
	{ path: 'user/:id', component: UserComponent },
	{ path: '', component: HomeComponent }
	];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {
}