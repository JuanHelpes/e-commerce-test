import { ApiProperty } from "@nestjs/swagger";

export class CreateAddressDto {
    @ApiProperty({
        description: 'Rua do endereço',
        example: 'Av. Brasil',
    })
    street: string;

    @ApiProperty({
        description: 'Cidade do endereço',
        example: 'São Paulo',
    })
    city: string;

    @ApiProperty({
        description: 'Estado do endereço',
        example: 'SP',
    })
    state: string;

    @ApiProperty({
        description: 'CEP do endereço',
        example: '12345-678',
    })
    cep: string;

    @ApiProperty({
        description: 'Número do endereço',
        example: '123',
    })
    number: string;

    @ApiProperty({
        description: 'Bairro do endereço',
        example: 'Centro',
    })
    neighborhood: string;

    @ApiProperty({
        description: 'Complemento do endereço',
        example: 'Apto 101',
    })
    complement: string;
}
