import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultPageComponent } from './default-page/default-page.component';
import { FormsMainComponent } from './form-demos/forms-main/forms-main.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
