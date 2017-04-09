import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyServiceService } from './company-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Company } from './company.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, OnDestroy {

	id: string;
	company: Company;
	paramsSubscription: any;
	errorMessage: any;

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private companiesService: CompanyServiceService
  ) {}

  getCompany(id: string) {
  	this.companiesService.getCompany(id).subscribe((res) => { 
  	console.log(res);
  	this.company = res
  	}, error => this.errorMessage = <any>error )
  }

  ngOnInit() {
  	this.paramsSubscription = this.route.params.subscribe(params => {
  		this.id = params['id'];
  		this.getCompany(this.id);
  	})
  }

  ngOnDestroy() {
  	this.paramsSubscription.unsubscribe();
  }
  
  viewEditCompany(company) {
    this.router.navigate(['/edit', company.id]);
  }

}
