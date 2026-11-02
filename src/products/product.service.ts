import { Injectable, NotFoundException } from "@nestjs/common"
import { ProductDto } from "./dto/product.dto.js"
import { UpdateProductDto } from "./dto/update-product.dto.js"
import { CreateProductDto } from "./dto/create-product.dto.js"

@Injectable()
export default class ProductService {
    private products: ProductDto[] = []
    private nextId: number = 1

    findAll(): ProductDto[] {
        return this.products
    }
    
    findById(id: number): ProductDto {
        console.log('ID recebido:', id)
        const product = this.products.find(produto => produto.id == id)
        if(!product)
            throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        return product;
    }

    update(id:number, updatedProduct: UpdateProductDto): ProductDto {
        const product = this.products.find(produto => produto.id == id)
        if(!product)
            throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        Object.assign(product, updatedProduct);
        return product;
    }

    delete(id:number) {
        const index = this.products.findIndex(produto => produto.id == id)
        if (index === -1) throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        this.products.splice(index, 1)
    }

    create(createProduct: CreateProductDto): ProductDto{
        const { name, price, stock} = createProduct;
        const product: ProductDto = {id: this.nextId++, name, price, stock}

        this.products.push(product);
        return product;
    }
}