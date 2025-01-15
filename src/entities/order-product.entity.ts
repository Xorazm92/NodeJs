import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Order, order => order.orderProducts)
  order: Order;

  @ManyToOne(() => Product, product => product.orderProducts)
  product: Product;
}
