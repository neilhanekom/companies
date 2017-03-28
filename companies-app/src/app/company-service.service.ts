import { Injectable } from '@angular/core';

@Injectable()
export class CompanyServiceService {


  constructor() { }

  getCompanies() {
  	let companies = [
  		{
  			name: "ABC",
  			address: "ABC street",
  			city: "ABC city",
  			country: "South-Africa"
  		}
  	];

  	return companies;
  }
}
