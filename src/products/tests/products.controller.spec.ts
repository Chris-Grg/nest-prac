import { Test, TestingModule } from "@nestjs/testing"
import { ProductsController } from "../products.controller"
import { Controller } from "@nestjs/common"
import { ProductService } from "../products.service"
import { ProductSchema } from "../schema/products.schema"
import { MongooseModule } from "@nestjs/mongoose"

describe('ProductsController', ()=>{
    let productsController: ProductsController
    let productsService: ProductService

    beforeEach(async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers:[ProductService],
        }).compile()
        
        productsController = module.get<ProductsController>(ProductsController)
        productsService = module.get<ProductService>(ProductService)
    })

    it('should be defined', ()=>{
        expect(productsController).toBeDefined()
    })
    describe('getProducts', ()=>{
        it('should return an array of products',async ()=>{
        const expectedProducts={
            _id:"",
            title:"Nothing Phone 2a",
            description: "Not One Plus",
            price: 250
    }
            // jest.spyOn(productsService, 'getProducts').mockImplementation(()=>result)
            const result= productsService.getProducts()

            expect(result).toBeDefined()
            expect(Array.isArray(result)).toBe(true)
            expect(result).toMatchObject([expectedProducts])

            // expect(await productsController.getAllProducts()).toBe(result)
        })
    })
})