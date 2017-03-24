import { Component, OnInit } from '@angular/core';
import { CompanyServiceService } from './company-service.service';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

	companies: Array<any>;

  constructor(private companyService: CompanyServiceService) { }

  ngOnInit() {
  	this.companies = this.companyService.getCompanies();
  }

}
