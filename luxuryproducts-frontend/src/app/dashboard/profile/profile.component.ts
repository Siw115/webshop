import { Component, Input } from '@angular/core';
import { CustomUser } from '../../models/customuser.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../auth/token.service';
import { RouterModule } from '@angular/router';
import { AddressService } from '../../services/address.service';
import { Address } from '../../models/address.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Input()public user: CustomUser;

  public userLoading: boolean = true;
  public addressForm: FormGroup;
  editingIndex: number | null = null;

  

  constructor(private userService: UserService, private tokenService: TokenService, private addressService: AddressService, private fb: FormBuilder){
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const token = "Bearer " + this.tokenService.loadToken()    

    this.userService
    .getUserInfo()
    .subscribe((user: CustomUser) => {
      this.user = user;
      this.userLoading = false;            
    })
  }

  removeAddress(address: Address) {
    this.addressService.deleteAddress(address.id).subscribe({
      next: () => {
        this.user.addresses = this.user.addresses.filter(a => a.id !== address.id);
        console.log("Address deleted successfully");
      },
      error: (error) => {
        // Handle error
        console.error("Error deleting address", error);
      }
    });
  }

  trackByAddress(index: number, address: any): number {
    return address.id; // Assuming each address has a unique id
  }

  editAddress(index: number): void {
    this.editingIndex = index;
    const address = this.user.addresses[index];
    this.addressForm.patchValue({
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country
    });
  }

  onSubmit(address: Address, index: number): void {
    if (this.addressForm.valid && this.editingIndex !== null) {
      const updatedAddress = new Address(
        this.addressForm.value.street,
        this.addressForm.value.city,
        this.addressForm.value.state,
        this.addressForm.value.postalCode,
        this.addressForm.value.country
      );
      updatedAddress.id = this.user.addresses[this.editingIndex].id;
      this.addressService.updateAddress(updatedAddress).subscribe({
        next: () => {
          this.user.addresses[this.editingIndex] = updatedAddress;
          this.editingIndex = null; // Reset editingIndex
          console.log("Address updated successfully");
        },
        error: (error) => {
          console.error("Error updating address", error);
        }
      });
    }
  }
}
