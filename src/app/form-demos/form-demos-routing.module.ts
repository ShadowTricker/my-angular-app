import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { FormsMainComponent } from './forms-main/forms-main.component';

const routes: Routes = [
  {
    path: 'forms',
    component: FormsMainComponent,
    children: [
      { path: 'template', component: TemplateFormComponent },
      { path: 'reactive', component: ReactiveFormComponent },
      { path: 'custom', component: CustomFormComponent },
      { path: '', redirectTo: 'reactive', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormDemosRoutingModule { }
