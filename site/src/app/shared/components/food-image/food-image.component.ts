import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-food-image',
  templateUrl: './food-image.component.html',
  styleUrls: ['./food-image.component.scss']
})
export class FoodImageComponent implements AfterViewInit {
  @Input() imageUrl: string | undefined;
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement> | undefined;
  selectedFile: File | undefined;

  ngAfterViewInit() {
    if (this.imageInput) {
      this.imageInput.nativeElement.addEventListener('change', this.handleFileInput.bind(this));
    }
  }

  handleFileInput(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.selectedFile = file;
      this.imageUrl = URL.createObjectURL(file);
      console.log(this.imageUrl);
    }
  }

  openFileExplorer(event: Event) {
    event.preventDefault();
    if (this.imageInput) {
      this.imageInput.nativeElement.click();
    }
  }
}
