export interface CheckoutInfo {
    cost: string,
    tipPercent: string,
    paymentMethod: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    streetAddress: string,
    streetAddress2?: string,
    city: string,
    state: string,
    zip: string,
    country: string
    tokenId: string
}