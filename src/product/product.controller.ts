import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDto: CreateProductDTO){
        const product = await this.productService.createProduct(createProductDto);
        res.status(HttpStatus.OK).json({
            messaje: 'Product Successfuly Created',
            product: product
        });
    }

    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getProduts();
        return res.status(HttpStatus.OK).json({
            message: 'All Products',
            products
        });
    }

    @Get('/:id')
    async getProduct(@Res() res, @Param('id') productID) {
        const product = await this.productService.getProdut(productID);
        if (!product) throw new NotFoundException('Product Does Not exists');
        return res.status(HttpStatus.OK).json({
            message: 'Product',
            product
        });
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID ) {
        const productDeleted = await this.productService.deleteProduct(productID);
        if (!productDeleted) throw new NotFoundException('Product Does Not exists');
        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Successfully',
            productDeleted
        });
    }

    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID){
        const updatedProduct = await this.productService.updateProduct(productID, createProductDTO);
        if (!updatedProduct) throw new NotFoundException('Product Does Not exists');
        return res.status(HttpStatus.OK).json({
            message: 'Product Updated Successfully',
            updatedProduct
        });
    }
}
