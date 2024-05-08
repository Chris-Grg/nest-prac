import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductService } from "./products.service";
import { PartialproductsDto, productsDto } from "./dto/products.dto";

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductService){}
    @Post()
    @UsePipes(new ValidationPipe())
    async addProduct(@Body() productsDto: productsDto
    ):Promise<{}>{
    const {title, description, price}= productsDto
    const generatedId= this.productsService.insertProduct(title, description, price)
    return {id: generatedId}
    }

    @Get()
    getAllProducts(){
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId:string){
        return this.productsService.getSingleProduct(prodId)
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateProduct(
        @Param('id') prodId: string,
        @Body() productsDto: PartialproductsDto
        // @Body('title') prodTitle: string,
        // @Body('description') prodDesc: string,
        // @Body('price') prodPrice: number,

    ){
        const {title, description, price}= productsDto
        this.productsService.updateProduct(prodId, title, description, price )
        return "Updated"

    }
    @Delete(':id')
    removeProduct(
        @Param('id') prodId:string
    ){
        this.productsService.deleteProduct(prodId)
        return `${prodId} deleted`
    }

}