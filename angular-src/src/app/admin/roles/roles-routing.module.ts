import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { RolesComponent } from './roles.component';

const routes: Routes = [
  {
    path: '', component: RolesComponent, children: [
      { path: 'agregar', component: CreateComponent },
      { path: 'actualizar', component: UpdateComponent },
      { path: 'actualizar/:id', component: UpdateComponent },
      { path: 'eliminar', component: DeleteComponent },
      { path: 'eliminar/:id', component: DeleteComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
