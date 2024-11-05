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

A set of utilities and tools that makes it easier to intergrate custom split payment in your web applications using Tabby and its API.
