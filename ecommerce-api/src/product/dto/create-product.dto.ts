export class CreateProductDto {
    name: string;
    code_product: string;
    description: string;
    price: number;
    url_image: string;
    url_image_2?: string;
    userId?: string; // Optional field to associate with a user
}
