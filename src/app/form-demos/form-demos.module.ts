import { NgModule } from '@angular/core';
import { TemplateFormComponent } from './template-form/template-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { FormDemosRoutingModule } from './form-demos-routing.module';
import { FormsMainComponent } from './forms-main/forms-main.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [FormDemosRoutingModule],
  declarations: [
    FormsMainComponent,
    TemplateFormComponent,
    ReactiveFormComponent,
    CustomFormComponent,
  ],
  exports: [
    FormsMainComponent,
    TemplateFormComponent,
    ReactiveFormComponent,
    CustomFormComponent
  ],
})
export class FormDemosModule {}
