export interface CartItemVm {
    readonly id: string;
    readonly name: string;
    readonly price: number;
    readonly quantity: number;
    readonly total: number;
}