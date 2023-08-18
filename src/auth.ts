import { createSign } from 'node:crypto';
import axios from 'axios';
import * as strftime from 'strftime';

import { API_URL, Path } from './constants';
import { RuStoreError } from './errors';
import { TAuthResponse, TErrorResponse } from './types';

export class RSAuth {
  private readonly httpClient = axios.create({ baseURL: API_URL });
  private readonly privateKey: string;

  private $jwe: string | undefined;
  private sessionEnd: number | undefined;

  constructor(
    privateKey: string,
    private readonly companyId: number,
  ) {
    this.privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
  }

  public async auth() {
    const date = new Date();
    const t = strftime.timezone('+0300');
    const dateStr = t('%Y-%m-%dT%H:%M:%S+03:00', date);

    const str = `${this.companyId}${dateStr}`;

    const sign = createSign('RSA-SHA512');
    sign.write(str);
    sign.end();
    const signature = sign.sign(this.privateKey, 'base64');

    try {
      const result = await this.httpClient.post<TAuthResponse>(Path.Auth, {
        timestamp: dateStr,
        companyId: this.companyId,
        signature,
      });

      this.$jwe = result.data.body.jwe;
      this.sessionEnd = date.valueOf() + (result.data.body.ttl - 10) * 1000;
    } catch (e: any) {
      const data = e.response.data as TErrorResponse;

      throw new RuStoreError(data);
    }
  }

  public async getJwe(): Promise<string> {
    const time = Date.now();

    if (!this.$jwe || !this.sessionEnd || this.sessionEnd < time) {
      await this.auth();
    }

    return this.$jwe as string;
  }
}
