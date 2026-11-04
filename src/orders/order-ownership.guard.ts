import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable
} from "@nestjs/common";

import { OrdersService } from "./orders.service.js";

@Injectable()
export class OrderOwnershipGuard implements CanActivate {

    constructor(
        private ordersService: OrdersService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const { user, params } = request;

        const order = await this.ordersService.findOne(
            Number(params.id)
        );

        if (!order || order.client.id !== user.id) {
            throw new ForbiddenException(
                "Você não tem permissão para modificar esse pedido."
            );
        }

        return true;
    }
}