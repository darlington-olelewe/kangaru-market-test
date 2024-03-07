
export type TransactionInput = {
    tx_ref:string,
    amount:number,
    currency: 'NGN',
    redirect_url: string,
    merchant_secret_key:string,
    customer: CustomerInfo,
    customizations: Customization,
    callBack:(payload:any)=>any,
    close:(value: any)=>void
}

export type CustomerInfo =  {
    email:string,
    phonenumber: string,
    name: string,
}

export type Customization = {
    title: string,
    description: string,
    logo: string,
}

export default TransactionInput
