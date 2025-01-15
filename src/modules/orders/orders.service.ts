import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { OrderProduct } from '../../entities/order-product.entity';
import { Product } from '../../entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(userId: number, products: { productId: number }[]) {
    const order = this.orderRepository.create({
      user: { id: userId },
      total_price: 0,
    });

    await this.orderRepository.save(order);

    let totalPrice = 0;
    for (const item of products) {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
      });

      if (product) {
        const orderProduct = this.orderProductRepository.create({
          order,
          product,
        });
        await this.orderProductRepository.save(orderProduct);
        totalPrice += Number(product.price);
      }
    }

    order.total_price = totalPrice;
    return this.orderRepository.save(order);
  }

  async findAll() {
    return this.orderRepository.find({
      relations: ['user', 'orderProducts', 'orderProducts.product'],
    });
  }

  async findOne(id: number) {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'orderProducts', 'orderProducts.product'],
    });
  }

  async findUserOrders(userId: number) {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['orderProducts', 'orderProducts.product'],
    });
  }
}
