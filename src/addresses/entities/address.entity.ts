import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../../orders/order.entity.js';
import { IsString } from 'class-validator';

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    address: string;

    @OneToMany(() => Order, (order) => order.address)
    orders: Order[];
}