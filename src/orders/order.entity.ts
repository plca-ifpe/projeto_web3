import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata.js"

export type OrderStatus = 'OPEN' | 'PAID' | 'CANCELLED'

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'int'})
    userId: number

    @Column({ type: 'varchar', length: 20, default: 'OPEN'})
    status: OrderStatus

    @CreateDateColumn()
    createdAt: Date

    @OneToMany( () => OrderItem, (item) => item.order, {cascade: true, eager: true})
    items: OrderItem[]
}

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    productId: number

    @Column({type: 'int'})
    quantity: number

    @Column({type: 'numeric', precision: 10, scale: 2})
    unitPrice: number

    @ManyToOne(() => Order, (order) => order.items)
    order: Order
}