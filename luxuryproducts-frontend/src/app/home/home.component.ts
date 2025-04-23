import { Component } from '@angular/core';
import { ProductSlideshowComponent } from './product-slideshow/product-slideshow.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductSlideshowComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
