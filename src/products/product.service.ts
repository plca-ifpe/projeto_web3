import { Injectable, NotFoundException } from "@nestjs/common"
import { ProductDto } from "./dto/product.dto.js"
import { UpdateProductDto } from "./dto/update-product.dto.js"
import { CreateProductDto } from "./dto/create-product.dto.js"
import { ILike, Repository } from "typeorm"
import { Product } from "./product.entity.js"
import { InjectRepository } from "@nestjs/typeorm"
import { PatchProductDto } from "./dto/patch-product.dto.js"

@Injectable()
export default class ProductService {

    constructor (
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}

    findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }
    
    async findById(id: number): Promise<Product> {
        let product = await this.productRepository.findOne({ where: { id } })
        if(!product)
            throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        return product;
    }

    async update(id:number, updatedProduct: UpdateProductDto): Promise<Product> {
        const product = await this.productRepository.findOne({ where: {id } })
        if(!product)
            throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        Object.assign(product, updatedProduct);
        return this.productRepository.save(product);
    }

    async delete(id:number): Promise<void> {
        const result = await this.productRepository.delete(id);

        if (!result.affected) throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    async create(createProduct: CreateProductDto): Promise<Product> {
        const product = this.productRepository.create(createProduct)
        return this.productRepository.save(product)
    }

    async patch(id:number, updatedProduct:PatchProductDto): Promise<Product> {
        const product = await this.productRepository.findOne({ where: {id: id} } );
        if (!product)
            throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        Object.assign(product, updatedProduct)
        return this.productRepository.save(product);
    }

    async queryByName(query:string): Promise<Product[]> {
        return this.productRepository.find({ where: { name: ILike(`%${query}%`)}})
    }
}