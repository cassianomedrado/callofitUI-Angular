import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [NgbTooltipModule]
})
export class HomeComponent implements OnInit {
  title = 'callofitUI';
  showMenu = false;

  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  public ngOnInit(): void {

  }
}
