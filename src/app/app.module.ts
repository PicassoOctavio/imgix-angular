
// angular
import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';

// components
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { MainImageComponent } from './main-image/mainImage.component';
import { GalleryComponent } from './gallery/gallery.component';

// services
import { ImagesServices } from './services/images.services';
import { FilterService } from './services/filterService';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    MainImageComponent,
    GalleryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    HttpClientModule
  ],
  providers: [
    ImagesServices,
    FilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
