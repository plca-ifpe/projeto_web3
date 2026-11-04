import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { Order } from '../../orders/order.entity.js';
import { IsString } from 'class-validator';
import { User } from '../../auth/user.entity.js';

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    address: string;

    @OneToMany(() => Order, (order) => order.address)
    orders: Order[];

    @ManyToOne(() => User, (user) => user.addresses)
    user: Relation<User>;
}