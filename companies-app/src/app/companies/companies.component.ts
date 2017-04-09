import { Component, OnInit } from '@angular/core';
import { CompanyServiceService } from './company-service.service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

	companies: Array<any>;
	errorMessage: any;
	

  constructor(private companyService: CompanyServiceService, public router: Router ) { }

  ngOnInit() {
  	this.companyService.getCompanies().subscribe(res => this.companies = res, error => this.errorMessage = <any>error);
  }

  viewCompany(company) {
    this.router.navigate(['/companies', company.id]);
  }


}
