import { Variant } from './variant.model'; // Import the Variant model
import { Category } from './category.model'; // Import the Category model (assume you have a Category model defined)

export class Product {
    private _id: number;
    private _name: string;
    private _description: string;
    private _imageUrl: string;
    private _category: Category;
    private _variants: Variant[]; // Add the variants property

    constructor(
        id: number,
        name: string,
        description: string,
        imageUrl: string,
        category: Category,
        variants: Variant[] = [] // Initialize variants in the constructor
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._imageUrl = imageUrl;
        this._category = category;
        this._variants = variants;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get imageUrl(): string {
        return this._imageUrl;
    }
    public set imageUrl(value: string) {
        this._imageUrl = value;
    }

    public get category(): Category {
        return this._category;
    }
    public set category(value: Category) {
        this._category = value;
    }

    public get variants(): Variant[] { // Add getter for variants
        return this._variants;
    }
    public set variants(value: Variant[]) { // Add setter for variants
        this._variants = value;
    }
}
