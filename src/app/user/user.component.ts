import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { debounce } from 'rxjs/operators/debounce';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	user;
	photo: User;
	posts = [];

	constructor(
		private route: ActivatedRoute,
		private userService: UserService,
		private location: Location
		) {}

	ngOnInit() {
		this.getUser();
		this.getPhoto();

		const id = +this.route.snapshot.paramMap.get('id');
		const getPostsObservable = this.userService.getPosts(id);
		const getCommentsObservable = this.userService.getComments();

		Observable.forkJoin(getPostsObservable, getCommentsObservable)
			.map(results => {
				const posts = results[0];
				const comments = results[1];
				return posts.map((post, index) => {
					const commentsByPost = comments.filter(comment => comment.postId === post.id);
					post.comments = commentsByPost;
					return post;
				});
				
			})
			.subscribe(results => {
				this.posts = results
			}
			);
	}

	getUser(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.userService.getUser(id)
		.subscribe(user => { return this.user = user});
	}

	getPhoto(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.userService.getPhoto(id)
		.subscribe(user => this.photo = user);
	}

	getPosts(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.userService.getPosts(id)
		.subscribe(user => this.posts = user);
	}
}