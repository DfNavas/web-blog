import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { User } from './user';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class UserService {

	constructor(
		private http: HttpClient
	) { }

	private usersUrl = 'https://jsonplaceholder.typicode.com/';

	getUsers(): Observable<User[]> {
		const url = `${this.usersUrl}users`;
		return this.http.get<User[]>(url)
	}

	getPhotos(): Observable<User[]> {
		const url = `${this.usersUrl}photos`;
		return this.http.get<User[]>(url)
	}

	getUser(id: number): Observable<User> {
		const url = `${this.usersUrl}users/${id}`;
		return this.http.get<User>(url)
	}

	getPhoto(id: number): Observable<User> {
		const url = `${this.usersUrl}photos/${id}`;
		return this.http.get<User>(url)
	}

	getPosts(id: number): Observable<User[]> {
		const url = `${this.usersUrl}posts?userId=${id}`;
		return this.http.get<User[]>(url)
	}

	getComments(): Observable<any[]> {
		const url = `${this.usersUrl}comments`;
		return this.http.get<any[]>(url)
	}
}