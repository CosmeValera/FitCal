import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from '@angular/fire/storage';

@Component({
  selector: 'app-food-image',
  templateUrl: './food-image.component.html',
  styleUrls: ['./food-image.component.scss'],
})
export class FoodImageComponent implements AfterViewInit {
  @Input() imageUrl: string | undefined;
  @ViewChild('imageInput') imageInput!:
    | ElementRef<HTMLInputElement>
    | undefined;
  selectedFile: File | undefined;
  storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
    console.log('pr', this.imageUrl);
  }

  ngAfterViewInit() {
    // Escucha el evento 'change' del input de imagen
    if (this.imageInput) {
      this.imageInput.nativeElement.addEventListener(
        'change',
        this.handleFileInput.bind(this)
      );
    }
  }

  handleFileInput(event: Event) {
    // Maneja la selección de un archivo de imagen
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.selectedFile = file;
      this.uploadImage(file);
    }
  }

  uploadImage(file: File) {
    // Carga la imagen en Firebase Storage
    const imgRef = ref(this.storage, `images/${file.name}`);

    uploadBytes(imgRef, file)
      .then((response) => {
        // La imagen se cargó exitosamente
        console.log(response);
        this.getImageUrl(imgRef);
      })
      .catch((error) => console.log(error));
  }

  getImageUrl(ref: any) {
    // Obtiene la URL de descarga de la imagen cargada
    getDownloadURL(ref)
      .then((url) => {
        // URL de la imagen obtenida con éxito
        this.imageUrl = url;
        console.log(this.imageUrl);
      })
      .catch((error) => console.log(error));
  }

  openFileExplorer(event: Event) {
    // Abre el explorador de archivos cuando se hace clic en un elemento
    event.preventDefault();
    if (this.imageInput) {
      this.imageInput.nativeElement.click();
    }
  }
}
