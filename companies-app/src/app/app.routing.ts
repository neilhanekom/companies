import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './companies/company.component';
import { NewCompanyComponent } from './companies/new-company.component';
import { EditCompanyComponent } from './companies/edit-company.component';

const appRoutes: Routes = [
	{path: '', redirectTo: '/companies', pathMatch: 'full'},
	{path: 'companies', component: CompaniesComponent },
	{path: 'companies/:id', component: CompanyComponent },
	{path: 'new', component: NewCompanyComponent },
	{path: 'edit/:id', component: EditCompanyComponent },


]

export const routing = RouterModule.forRoot(appRoutes);