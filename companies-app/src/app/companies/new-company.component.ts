import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CompanyServiceService } from './company-service.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';



@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css']
})
export class NewCompanyComponent implements OnInit {

	companyForm: FormGroup;
  

  	constructor(private fb: FormBuilder, private companyService: CompanyServiceService, public router: Router ) {
  		this.createForm();
  	}

  	createForm() {
	    this.companyForm = this.fb.group({
	      name: ['', Validators.required ],
	      address: ['', Validators.required ],
	      city: ['', Validators.required ],
	      country: ['', Validators.required ],
	      email: '',
	      contact: '',
	      directors: this.fb.array([
	      	this.fb.group({
	      		name: ['']
	      	})
	      ])
	    });

	  }

  	ngOnInit() {
  	}


  	addDirector() {
  		let dirs = <FormArray>this.companyForm.get('directors');
  		dirs.push(this.fb.group({
  			name: ['']
  		}))
  	};

  	removeDirector(index: number) {
  		let dirs = <FormArray>this.companyForm.get('directors');
  		dirs.removeAt(index);
  	}

  	viewCompanies() {
  		this.router.navigate(['/companies'])
  	}

  onSubmit() {
  	console.log(this.companyForm.value);
  	this.companyService.addCompany(this.companyForm.value).subscribe(res => this.viewCompanies(), error => console.log(error));
  }



}
