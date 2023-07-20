import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { EcommerceService } from '../../service/ecommerce.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit{
  url: string = '';
  userName: string = '';
  constructor(
    private eService :EcommerceService,
    private router:Router,
    private changeDetector: ChangeDetectorRef
  ) {
    if (this.eService.getAdminName() !== null) {
      this.userName = this.eService.getAdminName();
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
    if (link === '/admin/logout') {
      this.eService.clientLogout();
      return;
    }
    this.router.navigate([link]);
  }

}
