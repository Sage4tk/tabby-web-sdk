export interface Payment {
    amount: string;
    currency?: "AED" | "SAR" | "KWD" | "BHD" | "QAR"; // Fixed value, can use a string union type if there are multiple options
    description?: string;
    buyer: Buyer;
    shipping_address: ShippingAddress;
    order: Order;
    buyer_history: BuyerHistory;
    order_history: OrderHistory[];
    meta?: Meta;
    attachment?: Attachment;
}

export interface Buyer {
    phone: string;
    email: string; // Can be improved by using a more specific email type if needed
    name: string;
    dob?: string; // Ideally should be a Date type, or ISO 8601 string
}

export interface ShippingAddress {
    city: string;
    address: string;
    zip: string;
}

interface Item {
    title: string; // Required: Name of the product.
    description?: string; // Optional: Description for the product.
    quantity: number; // Required: Quantity of the product ordered. Must be >= 1. Default: 1
    unit_price: string; // Required: Price per unit of the product. Should be positive or zero. Default: "0.00"
    discount_amount?: string; // Optional: Amount of the applied discount if any. Default: "0.00"
    reference_id?: string; // Required: Merchant’s product identifier.
    image_url?: string; // Optional: URL of the item image to show in the order information.
    product_url?: string; // Optional: URL of the item at your store.
    gender?: string; // Optional: Enum for gender.
    category: string; // Required: Name of high-level category or category-id.
    color?: string; // Optional: Limited color options.
    product_material?: string; // Optional: Material options.
    size_type?: string; // Optional: Size type.
    size?: string; // Optional: Size options.
    brand?: string; // Optional: Brand name.
    is_refundable?: boolean; // Required: Indicates whether a product can be returned.
}

export interface Order {
    tax_amount?: string; // Can use number if representing as a numeric value
    shipping_amount?: string;
    discount_amount?: string;
    updated_at?: string; // Ideally should be a Date type or ISO 8601 string
    reference_id: string;
    items: Item[];
}

export interface BuyerHistory {
    registered_since: string; // Ideally should be a Date type or ISO 8601 string
    loyalty_level: number;
    wishlist_count?: number;
    is_social_networks_connected?: boolean;
    is_phone_number_verified?: boolean;
    is_email_verified?: boolean;
}

export interface OrderHistory {
    purchased_at: string;
    amount: string;
    payment_method?: "card" | "cod";
    status: "new" | "processing" | "complete" | "refunded" | "cancelled" | "unknown";
    buyer:Buyer,
    shipping_address: ShippingAddress,
    items: Item[]
}

export interface Meta {
    order_id: string | null; // Assuming order_id can be null
    customer: string | null; // Assuming customer can be null
}

export interface Attachment {
    body: string; // Could be parsed into a more structured format if needed
    content_type: string;
}

export interface MerchantUrls {
    success: string;
    cancel: string;
    failure: string;
}

// Main interface for the overall structure
export interface PaymentRequest {
    payment: Payment;
    lang?: "ar" | "en"; // Fixed value, can use a string union type if there are multiple options
    merchant_urls?: MerchantUrls;
    // token?: string | null; // Assuming token can be null
}
