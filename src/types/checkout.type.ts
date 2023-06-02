export interface CheckoutInfo {
    cost: string,
    tipPercent: string,
    feeMethod: number,
    firstName: string,
    lastName: string,
    email: string,
    auth?: string,
    password?: string,
    phoneNumber: string,
    streetAddress: string,
    streetAddress2?: string,
    city: string,
    state: string,
    zip: string,
    country: string
    isValidCard: boolean
    isConfirmedPurchase: boolean
    walletAddress: string
    token: string
    dob?: Date,
    gender?: string
    taxId?: string
    userEmail: string
    userPhoneNumber: string
}