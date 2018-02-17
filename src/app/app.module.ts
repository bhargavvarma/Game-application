import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BombComponent } from './bomb/bomb.component';
import { BucketComponent } from './bucket/bucket.component';
import { DndModule } from 'ng2-dnd';

@NgModule({
  declarations: [
    AppComponent,
    BombComponent,
    BucketComponent
  ],
  imports: [
    BrowserModule,
    DndModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
