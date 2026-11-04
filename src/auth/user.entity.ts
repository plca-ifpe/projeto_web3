import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import type { Relation } from "typeorm"
import { Order } from "../orders/order.entity.js"
import { Address } from "../addresses/entities/address.entity.js"

export type Role = 'CLIENT' | 'ADMIN' | 'MANAGER'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({default: 'CLIENT'})
    role: Role

    @OneToMany(() => Order, (order) => order.client)
    orders: Relation<Order[]>

    @OneToMany(() => Address, (address) => address.user)
    addresses: Relation<Address[]>;
}