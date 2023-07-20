import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { EcommerceService } from '../../service/ecommerce.service';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent implements OnInit {
  url: string = "/client/home";
  userName: string = '';
  constructor(
    private eService :EcommerceService,
    private router:Router
  ) {
    if (this.eService.getClientName() !== null) {
      this.userName = this.eService.getClientName();
    }
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: any) => {
      this.url = event?.url;
    });
  }
  routerToLink(link: string): void {
    if (link === '/client/logout') {
      this.eService.clientLogout();
      return;
    }
    this.router.navigate([link]);
  }

}
