import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { PresentationsComponent } from './presentations.component';

const routes: Routes = [
  {
    path: '', component: PresentationsComponent, children: [
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
export class PresentationsRoutingModule { }
