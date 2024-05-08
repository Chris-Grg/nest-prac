import { IsString, IsDefined, IsInt, IsOptional } from "class-validator";

export class productsDto {
    @IsString()
    @IsDefined()
    title: string;

    @IsString()
    @IsDefined()
    description: string;

    @IsDefined()
    @IsInt()
    price:number;
}


export class PartialproductsDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsInt()
    @IsOptional()
    price:number;
}