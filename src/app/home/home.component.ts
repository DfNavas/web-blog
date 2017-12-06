import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { debug } from 'util';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
	users: User[] = [];
	photos: User[] = [];
	
	constructor(private userService: UserService) { }

	ngOnInit() {
		const getUsersObservable = this.userService.getUsers();
		const getPhotosObservable = this.userService.getPhotos();

		Observable.forkJoin(getUsersObservable, getPhotosObservable)
			.map(results => {
				const users = results[0];
				const photos = results[1];
				return users.map((user, index) => {
					user.url = photos[index].url;
					return user;
				});
				
			})
			.subscribe(results => 
				this.users = results
			);
	}

	getUsers(): void {
		this.userService.getUsers().subscribe(users => this.users = users);
	}

	getPhotos(): void {
		this.userService.getPhotos().subscribe(photos => this.photos = photos);
	}

}