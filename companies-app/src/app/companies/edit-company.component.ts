import { Component, OnInit } from '@angular/core';
import { CompanyServiceService } from './company-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Company } from './company.model';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

	companyForm: FormGroup;
  	company: Company;
  	companyId: string;
  	paramsSubscription: any;
  	errorMessage: string;

  constructor(private fb: FormBuilder, private companyService: CompanyServiceService, public router: Router, private route: ActivatedRoute, ) {
  
  }

  ngOnInit() {
  	
  	this.paramsSubscription = this.route.params.subscribe(params => {
  		this.companyId = params['id'];
  		this.companyService.getCompany(this.companyId).subscribe((res) => { 
	  		this.company = res;
	  		this.createForm();
	  		}, error => this.errorMessage = <any>error )
	  		
	}); 
  }

  buildDirectorsArray() {
  	let dirArray = this.fb.array([]);
  	this.company.directors.forEach(dir => {
  		const fg = this.fb.group({
	 			name: ['', Validators.required]
		});
		fg.patchValue(dir);
		dirArray.push(fg);
  	});

  	return dirArray;
  		
  }

  createForm() {
	    this.companyForm = this.fb.group({
	    	id: this.company.id,
	      	name: [this.company.name, Validators.required ],
	      	address: [this.company.address, Validators.required ],
	      	city: [this.company.city, Validators.required ],
	      	country: [this.company.country, Validators.required ],
	      	email: this.company.email,
	      	contact: this.company.contact,
	      	directors: this.buildDirectorsArray()
	    });

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

  	viewCompany() {
  		this.router.navigate(['/companies', this.company.id]);
  	}

  	onUpdate() {
  		this.companyService.updateCompany(this.companyForm.value).subscribe(res => this.viewCompany(), error => console.log("THis is error: " + error));
  	}

}
