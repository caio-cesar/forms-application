import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule} from 'ngx-mask';

import { AppComponent } from './app.component';
import { PessoaComponent } from './pessoa/pessoa.component';

const appRoutes: Routes = [
  {
    path: 'pessoa', component: PessoaComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PessoaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
