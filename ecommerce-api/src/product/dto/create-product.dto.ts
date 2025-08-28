import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({
        description: 'Nome do produto',
        example: 'Computador Gamer',
    })
    name: string;

    @ApiProperty({
        description: 'Código do produto',
        example: 'CG-12345',
    })
    code_product: string;

    @ApiProperty({
        description: 'Descrição do produto',
        example: 'Um computador gamer de alta performance',
    })
    description: string;

    @ApiProperty({
        description: 'Preço do produto',
        example: 4999.99,
    })
    price: number;

    @ApiProperty({
        description: 'URL da imagem do produto',
        example: 'http://example.com/imagem.jpg',
    })
    url_image: string;

    @ApiProperty({
        description: 'URL da segunda imagem do produto',
        example: 'http://example.com/imagem2.jpg',
    })
    url_image_2?: string;

    @ApiProperty({
        description: 'ID do usuário associado ao produto',
        example: 'user-123',
        required: false,
    })
    userId?: string; // Optional field to associate with a user
}
