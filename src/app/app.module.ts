import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RectComponent } from './rect/rect.component';
import { ValueComponent } from 'app/value/value.component';
import { ScoreService } from 'app/share/score.service';

@NgModule({
  declarations: [
    AppComponent,
    RectComponent,
    ValueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ScoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
