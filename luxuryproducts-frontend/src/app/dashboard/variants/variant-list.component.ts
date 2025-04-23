import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Variant} from "../../models/variant.model";
import {VariantService} from "../../services/variant.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-variant-list',
    templateUrl: './variant-list.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgForOf
    ]
})
export class VariantListComponent implements OnInit {
    variants: Variant[] = [];

    constructor(private variantService: VariantService, private router: Router) {}

    ngOnInit(): void {
        this.loadVariants();
    }

    loadVariants(): void {
        this.variantService.getAllVariants().subscribe({
            next: (variants) => this.variants = variants,
            error: (err) => console.error(err)
        });
    }

    addVariant(): void {
        this.router.navigate(['/variants/new']);
    }

    editVariant(id: number): void {
        this.router.navigate(['/variants', id, 'edit']);
    }

    removeVariant(id: number): void {
        this.variantService.deleteVariant(id).subscribe({
            next: () => this.loadVariants(),
            error: (err) => console.error(err)
        });
    }

    trackByVariant(index: number, variant: Variant): number {
        return variant.id;
    }
}
