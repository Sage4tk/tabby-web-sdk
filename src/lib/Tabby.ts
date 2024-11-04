import TabbyError from "../errors/TabbyError";
import { PaymentRequest } from "../types/interface";

/**
 * A class that provides all the necessary utilities to interact with the Tabby API as a Merchant charging
 */
export class Tabby {

    private tabbyHost:string = "https://api.tabby.ai/api/v2/checkout";
    private apiKey:string | null = null;
    private merchatCode:string | null = null;

    /**
     * Initializes Tabby by setting an API key to communicate with the the Tabby API in order to create sessions. 
     * @param apiKey 
     * @param merchantCode
     */
    public initialize(apiKey:string, merchantCode: string) {

        // initialize important merchant keys
        this.apiKey= apiKey;
        this.merchatCode = merchantCode;

    }

    /**
     * Calls the tabby API to create a session and split the payment in 4.
     * @param payload 
     * 
     * @see [Referral] (https://api-docs.tabby.ai/#operation/getCheckoutSession)
     */
    public async createSession(
        payload: PaymentRequest
    ) {

        // throw an error if there is no API KEY
        if (!this.apiKey) throw new TabbyError("Missing API key.", 400);

        try {

            // send payload to TABBY API
            const response = await fetch(
                this.tabbyHost,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + this.apiKey
                    },
                    body: JSON.stringify(payload)
                }
            );

            // parse the response data
            const data = await response.json();

            // handless success
            if (response.ok && response.status === 200) return data;

            // 200 is not returned return the proper message on why the API call didnt get a success.
            throw new TabbyError(
                response.status === 400 ? "Missing payload requirements or format is wrong.":
                response.status === 401 ? "Required authetication header is missing.":
                response.status === 403 ? "Forbidden action":
                response.status === 404 ? "Incorrect ID":
                "Something bad happened, We're notified",
                response.status
            )


        } catch (err) {

            
            throw err;

        }

    }

}