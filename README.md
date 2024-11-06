# tabby-web-sdk

A set of utilities and tools that makes it easier to intergrate custom split payment in your web applications using Tabby and its API. Tabby lets you split your purchases into 4 monthly payments so you can worry less and aim for more. And you'll never pay interest or fees.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

Install the package via npm:

```
npm install tabby-web-sdk
```

See below for usage

## Usage

Before creating a session, you must first initialize the sdk and provide it your public API key and merchant code which is provided in the custom integration section in the merchant dashboad page of tabby.

Get the puublic API key and merchant code: https://merchant.tabby.ai/

```
import { Tabby } from "tabby-web-sdk"

const tabbyClient = new Tabby();

tabbyClient.initialize("INSERT API KEY HERE", "INSERT MERCHANT CODE HERE");
```

\*\* If this is your first time integrating Tabby in your web app, they will provide you a public test key that will be needed to integrate on a development page. After this, you will have to E-mail Tabby this web page where they will have to do a QA to make sure everything in your web app follows their documentation from the flow of the payment to the promo message UI.# tabby-web-sdk

You can now create a session after initiating the Tabby client and the library already provides types if you're already using Typescript to make it easier to create a payload.

Example:

```

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

const data = await tabbyClient.createSession(succesPayload);

// on success will return the session link and you need to redirect your page to this link or on fail will return the necessary message to display in your API.

// success object
{
    status: "created",
    link: "URL TO SESSION",
    paymentId: "c8af5861-4c04-416e-9d86-e5f6fd718d3a" // just incase you need to do any logic to payment id IE: sending it to the backend to capture the amount
}

// rejection object
{
    status: "rejected",
    reject_reason: "reason of rejection",
    reject_message: "the rejection message" // you need to display this on the UI
}

```

\*\* If the session returns a rejection, you must remove the Tabby payment feature in your UI whilst displaying the message.
