import TabbyError from "../errors/TabbyError";
import { PaymentRequest } from "../types/interface";
import { Tabby } from "./Tabby";

const tabbyClient = new Tabby();

tabbyClient.initialize("", "");

const succesPayload:PaymentRequest = {
    payment: {
        amount: "500.00",
        currency: "AED",
        buyer: {
            email: "card.success@tabby.ai",
            name: "Tabby Card",
            phone: "+971500000001"
        },
        buyer_history: {
            registered_since: new Date().toISOString(),
            loyalty_level: 0
        },
        shipping_address: {
            address: "Block 13, Silicon Oasis",
            city: "Dubai",
            zip: "00000"
        },
        order: {
            reference_id: "b317f738-5d3d-4f41-8ff1-5b6677432b85",
            items: [

            ]
        },
        order_history: []
    },
    lang: "en",  // Selection between english or arabic (defaulted as english)
    merchant_urls: {
        success: "https://example.com/success",
        cancel: "https://example.com/cancel",
        failure: "https://example.com/failure"
    }, // handle redirect
}

test("Eligible session test", async () => {

    const data = await tabbyClient.createSession(succesPayload);

    expect(data.link).toBeDefined();

});

const failingPayload:PaymentRequest = {
    payment: {
        amount: "500.00",
        currency: "AED",
        buyer: {
            email: "card.success@tabby.ai",
            name: "Tabby Card",
            phone: "+971500000002"
        },
        buyer_history: {
            registered_since: new Date().toISOString(),
            loyalty_level: 0
        },
        shipping_address: {
            address: "Al Ghadeer",
            city: "DUBAI",
            zip: "00000"
        },
        order: {
            reference_id: "awe12321A",
            items: [

            ]
        },
        order_history: []
    }
}

test("Ineligible session test", async () => {

    try {

        const data = await tabbyClient.createSession(failingPayload);

    } catch (err) {

        expect(err).toBeInstanceOf(TabbyError);

    }
    


});