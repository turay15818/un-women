import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddProductService } from 'src/Service/add-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productForm: FormGroup;
  isLoading: boolean = false;
  loadingMessage = 'Creating your Product...';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private addProduct: AddProductService
  ) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      discription: ['', Validators.required],
      category: ['Select Category', Validators.required],
      previousPrice: ['', Validators.required],
      currentPrice: ['', Validators.required],
      rating: ['', null],
      productImageOne: [null, Validators.required],
      productImageTwo: [null, Validators.required],
      productImageThree: [null],
      productImageFour: [null],
      productImageFive: [null],
      productImageSix: [null],
    });
  }

  showSuccessMessage = false;

  onSubmit() {
    this.isLoading = true;
    this.loadingMessage = 'Creating your Product...';
    if (this.productForm.invalid) {
      return;
    }

    const formData = this.getFormDataFromForm();

    this.addProduct
      .addProduct(formData)
      .subscribe(
        (response) => {
          this.router.navigate(['dashboard']);
          console.log(this.addProduct, 'This was the data sent to the server');
          console.log('Product created successfully:', response);
        },
        (error) => {
          console.error('Error creating Product:', error);
        }
      )
      .add(() => {
        this.isLoading = false;
        this.loadingMessage = '';
      });
  }

  
  onFileSelected(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const maxSize = 4.5 * 1024 * 1024;
      if (file.size <= maxSize) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const fileContent = e.target.result;
          this.productForm.get(controlName)!.setValue(file);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select an image that is less than 5MB in size.');
        event.target.value = '';
      }
    }
  }





  private getFormDataFromForm(): FormData {
    const formData = new FormData();
    const formControls = this.productForm.controls;
    for (const controlName in formControls) {
      if (formControls.hasOwnProperty(controlName)) {
        const control = formControls[controlName];
        if (control instanceof File) {
          formData.append(controlName, control);
        } else {
          formData.append(controlName, control.value);
        }
      }
    }
    return formData;
  }
}
