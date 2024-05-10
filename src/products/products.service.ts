import { Injectable, NotFoundException } from "@nestjs/common";
// import { Product } from "./product.model";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schema/products.schema";
import { Model, ObjectId } from "mongoose";

@Injectable()
export class ProductService{
    // private products: Product[]=[];
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<Product>
    ){

    }
    
    async insertProduct(title: string, desc:string, price:number):Promise<string>{
        const newProduct = this.productModel.create({title:title, description:desc, price:price})
        // this.products.push(newProduct);
        return Promise.resolve(title);
    }

    async getProducts(){
        // return [...this.products]
        return await this.productModel.find()
    }

    async getSingleProduct(productId: string){
        const product = await this.productModel.findById(productId)
        if(!product){
            throw new NotFoundException('Could not find product')
        }
        return product
    }

    async updateProduct(productId: string, title: string, desc: string, price:number){
        const updatedProduct = await this.productModel.findByIdAndUpdate(
            productId,
            {title:title,
            description: desc,
            price: price
            }

        )
        if(!updatedProduct){
            throw new NotFoundException('Could not find product')
        }
        return updatedProduct
    }
    // private findProduct(id:string){
    //     // const productIndex = this.products.findIndex((prod)=>prod.id === id)
    // //    const product = this.products[productIndex]
    // const product = this.productModel.findById(id)
    //     if (!product){
    //         throw new NotFoundException('Could not find product')
    //     }
    //     return product

    // }

    async deleteProduct(productId:string){
        await this.productModel.findByIdAndDelete(productId)
    }
}
