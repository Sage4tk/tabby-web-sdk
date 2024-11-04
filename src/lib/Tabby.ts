import TabbyError from "../errors/TabbyError";

/**
 * A class that provides all the necessary utilities to interact with the Tabby API as a Merchant charging
 */
export class Tabby {

    private static tabbyHost:string = "https://api.tabby.ai/api/v2/checkout";
    private apiKey:string | null = null;

    /**
     * Initializes Tabby by setting an API key to communicate with the the Tabby API in order to create sessions. 
     * @param apiKey 
     */
    public initialize(apiKey:string) {

        this.apiKey= apiKey;

    }

    public async createSession(
        payload: string
    ) {

        // throw an error if there is no API KEY
        if (!this.apiKey) throw new TabbyError("Missing API key.", 400);

        try {

            

        } catch (err) {
            
        }

    }

}