# RuStore client for NodeJs
<a href="https://www.npmjs.com/package/@piavart/rustore-client"><img src="https://img.shields.io/npm/v/@piavart/rustore-client" alt="NPM Version"></a>
<a href="https://github.com/piavart/nestjs-dynamoose/blob/master/LICENSE"><img src="https://img.shields.io/github/license/piavart/rustore-client" alt="Package License"></a>

## Install
`npm install @piavart/rustore-client`

## Usage

``` ts
import { RuStoreClient } from '@piavart/rustore-client';

const privateKey = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASZ...'
const keyId = 123;
const isSandbox = false;

const client = new RuStoreClient(privateKey, keyId, isSandbox);

const purchase = await client.getPurchase('123.321');
```

В настоящий момент реализован функционал верификации платежей и получение информации о подписке по токену платежа.

[RuStore API](https://www.rustore.ru/help/work-with-rustore-api/)