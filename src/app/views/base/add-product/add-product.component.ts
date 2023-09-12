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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private businessProfileService: AddProductService
  ) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      discription: ['', Validators.required],
      category: ['', Validators.required],
      previousPrice: ['', Validators.required],
      currentPrice: ['', Validators.required],
      rating: ['', Validators.required],
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
    if (this.productForm.invalid) {
      return;
    }
  
    const formData = this.getFormDataFromForm();
  
    this.businessProfileService.addProduct(formData).subscribe(
      (response) => {
        console.log('Product created successfully:', response);
  
        // Display a success message
        this.showSuccessMessage = true;
  
        // Hide the success message after 3 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
  
        // Reset the form fields
        this.productForm.reset();
      },
      (error) => {
        console.error('Error creating Product:', error);
      }
    );
  }
  

  
  // onSubmit() {
  //   if (this.productForm.invalid) {
  //     return;
  //   }

  //   const formData = this.getFormDataFromForm();

  //   this.businessProfileService.addProduct(formData).subscribe(
  //     (response) => {
  //       console.log('Business Profile created successfully:', response);
  //     },
  //     (error) => {
  //       console.error('Error creating Business Profile:', error);
  //     }
  //   );
  // }

  onFileSelected(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const fileContent = e.target.result;
        this.productForm.get(controlName)!.setValue(file);
      };

      reader.readAsDataURL(file);
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
