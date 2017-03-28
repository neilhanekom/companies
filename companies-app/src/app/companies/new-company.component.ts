import { Component, OnInit } from '@angular/core';
import { CompanyServiceService } from './company-service.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css']
})
export class NewCompanyComponent implements OnInit {
	
	companyForm: FormGroup;
	

  	constructor(private fb: FormBuilder, private companyService: CompanyServiceService) {
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

	    console.log(this.companyForm);
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

  onSubmit() {
  	console.log(this.companyForm.value);
  	this.companyService.addCompany(this.companyForm.value).subscribe(res => console.log(res), error => console.log(error));
  }



}
