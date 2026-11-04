import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../../orders/order.entity.js';

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    // Your other address columns...

    @OneToMany(() => Order, (order) => order.address)
    orders: Order[];
}