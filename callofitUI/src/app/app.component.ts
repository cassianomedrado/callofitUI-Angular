import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/AuthService/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'callofitUI';
  showMenu = false;

  constructor(private authService: AuthService, 
              private toastr: ToastrService,
              private router: Router) { }

  public ngOnInit(): void {
    this.start();
  }

  private start() {
    this.showMenu = this.authService.isLoggedIn();
  }

  public onRouterChange() {
    this.showMenu = this.authService.isLoggedIn();
    
    if (!this.authService.isLoggedIn()) {
      this.showMenu = false;
      this.router.navigate(['/login']);
    }
  }

  public logout(){
    this.authService.logout();
    this.toastr.success('Deslogado com sucesso!');
    this.router.navigate(['/login']);
  }
}
