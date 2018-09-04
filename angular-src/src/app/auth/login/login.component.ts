import { NotificationsService } from "../../notifications/notifications.service";
import { AuthService } from "../auth.service";
import { Login } from "../../shared/models/login";
import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  login: Login = new Login();
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private auth: AuthService,
    private notifications: NotificationsService
  ) {}

  ngOnInit() {}

  onSubmit(form: any) {
    const loginForm: Login = form.value;
    this.auth.login(loginForm).subscribe(
      (res: any) => {
        console.log(res);
        this.auth.updateUserData(res.user, res.token);
        this.notifications.show(
          `Hola ${res.user.name}!`,
          undefined,
          "success"
        );
        this.dialogRef.close();
        // this.dialogRef.close({
        //   user: res.user
        // });
      },
      (e: HttpErrorResponse) => {
        this.notifications.show(e.error, undefined, "danger");
        form.resetForm();
      }
    );
  }
}
