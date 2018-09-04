import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  {
    path: '', component: CategoriesComponent, children: [
      { path: 'agregar', component: CreateComponent },
      { path: 'actualizar', component: UpdateComponent },
      { path: 'actualizar/:_id', component: UpdateComponent },
      { path: 'eliminar', component: DeleteComponent },
      { path: 'eliminar/:_id', component: DeleteComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
