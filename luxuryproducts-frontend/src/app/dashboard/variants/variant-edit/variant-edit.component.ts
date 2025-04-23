import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {VariantService} from "../../../services/variant.service";
import {Variant} from "../../../models/variant.model";

@Component({
    selector: 'app-variant-edit',
    templateUrl: './variant-edit.component.html',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ]
})
export class VariantEditComponent implements OnInit {
    variantForm: FormGroup;
    editing: boolean = false;
    variantId: number;

    constructor(
        private fb: FormBuilder,
        private variantService: VariantService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.variantForm = this.fb.group({
            color: ['', Validators.required],
            size: ['', Validators.required],
            additionalPrice: [0, Validators.required],
            stock: [0, Validators.required],
            productId: [0, Validators.required]
        });

        this.route.paramMap.subscribe(params => {
            if (params.has('id')) {
                this.editing = true;
                this.variantId = +params.get('id');
                this.loadVariant(this.variantId);
            }
        });
    }

    loadVariant(id: number): void {
        this.variantService.getVariantById(id).subscribe(variant => {
            this.variantForm.patchValue(variant);
        });
    }

    onSubmit(): void {
        if (this.variantForm.invalid) {
            return;
        }

        const variant: Variant = this.variantForm.value;
        if (this.editing) {
            this.variantService.updateVariant(this.variantId, variant).subscribe(
                () => this.router.navigate(['/dashboard/variants']),
                error => console.error('Error updating variant:', error)
            );
        } else {
            this.variantService.createVariant(variant).subscribe(
                () => this.router.navigate(['/dashboard/variants']),
                error => console.error('Error creating variant:', error)
            );
        }
    }
}
