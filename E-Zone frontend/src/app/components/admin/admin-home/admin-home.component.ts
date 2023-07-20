import { Component, OnInit } from '@angular/core';
import { EcommerceService } from '../../service/ecommerce.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  userName: string = '';
  constructor(
    private eService: EcommerceService
  ) {
    if (this.eService.getAdminName() !== null) {
      this.userName = this.eService.getAdminName();
    }
    this.eService.isAdminLoginPresent();
  }

  ngOnInit(): void {
  }

}
