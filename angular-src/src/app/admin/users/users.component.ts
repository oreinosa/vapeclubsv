import { Component, OnInit } from '@angular/core';
import { List } from '../../shared/helpers/list';
import { User } from '../../shared/models/user';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', '../../shared/styles/crud-list.scss']
})
export class UsersComponent extends List<User> {
  constructor(
    public service: UsersService,
    public router: Router,
  ) {
    super(
      service,
      router,
      ["id", "createdAt", "name", "username", "email", "role", "actions"]
    );
  }

  onAction(action: string, user: User) {
    let username = "";
    if (user) {
      username = user['username'];
      this.service.setSelectedObject(user);
    }
    this.router.navigate(["admin", this.service.collectionName.toLowerCase(), action, username]);
  }
}
