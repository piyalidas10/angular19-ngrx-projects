export interface CartSlice {
    readonly taxRate: number;
}

export const initialCartSlice: CartSlice = {
    taxRate: 0.08
}