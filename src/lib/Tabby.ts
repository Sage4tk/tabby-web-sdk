import TabbyError from "../errors/TabbyError";
import { PaymentRequest } from "../types/interface";

/**
 * A class that provides all the necessary utilities to interact with the Tabby API as a Merchant charging
 */
export class Tabby {

    private tabbyHost:string = "https://api.tabby.ai/api/v2/checkout";
    private apiKey:string | null = null;
    private merchantCode:string | null = null;

    /**
     * Initializes Tabby by setting an API key to communicate with the the Tabby API in order to create sessions. 
     * @param apiKey 
     * @param merchantCode
     */
    public initialize(apiKey:string, merchantCode: string) {

        // initialize important merchant keys
        this.apiKey= apiKey;
        this.merchantCode = merchantCode;

    }

    /**
     * Calls the tabby API to create a session and split the payment in 4.
     * @param payload PaymentRequest
     * 
     * @see [Referral] https://api-docs.tabby.ai/#operation/postCheckoutSession
     */
    public async createSession(
        payload: PaymentRequest
    ) {

        // throw an error if there is no API KEY
        if (!this.apiKey || !this.merchantCode) throw new TabbyError("Missing API key.", 400);

        try {

            // send payload to TABBY API
            const response = await fetch(
                this.tabbyHost,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + this.apiKey
                    },
                    body: JSON.stringify({
                        ...payload,
                        merchantCode: this.merchantCode,
                        lang: payload.lang ? payload.lang : 'en'
                    })
                }
            );

            // parse the response data
            const data = await response.json();
            
            // handless success
            if (response.ok && response.status === 200 && data.status === "created") return {
                status: "created",
                link: data.configuration.available_products.installments[0].web_url,
                paymentId: data.payment.id
            }

            // return proper message if not created and return project reject message for the UI
            if (response.ok && response.status === 200 && data.status === "rejected") return {
                status: "rejected",
                rejection_reason: data.configuration.products.installments[0].reject_reason,
                reject_message: data.configuration.products.installments[0].reject_reason === "order_amount_too_high" ? "This purchase is above your current spending limit with Tabby, try a smaller cart or use another payment method":
                                data.configuration.products.installments[0].reject_reason === "order_amount_too_low" ? "The purchase amount is below the minimum amount required to use Tabby, try adding more items or use another payment method":
                                "Sorry, Tabby is unable to approve this purchase. Please use an alternative payment method for your order."
            }

            // 200 is not returned return the proper message on why the API call didnt get a success.
            throw new TabbyError(
                response.status === 400 ? "Missing payload requirements or format is wrong.":
                response.status === 401 ? "Required authetication header is missing.":
                response.status === 403 ? "Forbidden action":
                response.status === 404 ? "Incorrect ID":
                "Something bad happened, We're notified",
                response.status
            );

        } catch (err) {
            
            throw err;

        }

    }

}