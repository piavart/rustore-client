import axios from 'axios';

import { RSAuth } from './auth';
import { API_URL, Path } from './constants';
import { RuStoreError } from './errors';
import {
  RS_LastActiveVersionResponse_Body,
  RS_Purchace,
  RS_SubscriptionResponse_Body,
  RS_SubscriptionState,
  RS_VersionsResponse_Body,
} from './interfaces';
import { TBaseResponse } from './types';
import { getRustoreError } from './utils/get-rustore-error';

export class RuStoreClient {
  private readonly auth: RSAuth;
  private readonly httpClient = axios.create({ baseURL: API_URL });

  constructor(
    privateKey: string,
    keyId: number,
    private readonly isSandbox: boolean = false,
  ) {
    this.auth = new RSAuth(privateKey, keyId);
  }

  public init() {
    return this.auth.auth();
  }

  /**
   * @see https://www.rustore.ru/help/work-with-rustore-api/api-subscription-payment/api-token-payment-method
   */
  public async getPurchase(purchaseToken: string): Promise<RS_Purchace> {
    const path = this.isSandbox ? Path.SandboxPurchase : Path.Purchase;

    const result = await this.request<TBaseResponse<RS_Purchace>>(
      `${path}${purchaseToken}`,
    );

    return result.body;
  }

  /**
   * @see https://www.rustore.ru/help/work-with-rustore-api/api-subscription-payment/api-token-subscription-method
   */
  public async getSubscription(
    purchaseToken: string,
  ): Promise<RS_SubscriptionResponse_Body> {
    const path = this.isSandbox ? Path.SandboxSubscription : Path.Subscription;

    const result = await this.request<
      TBaseResponse<RS_SubscriptionResponse_Body>
    >(`${path}${purchaseToken}`);

    return result.body;
  }

  /**
   * @see https://www.rustore.ru/help/work-with-rustore-api/api-subscription-payment/api-token-substatus-method
   */
  public async isSubscriptionActive(purchaseToken: string): Promise<boolean> {
    const path = this.isSandbox ? Path.SandboxSubscription : Path.Subscription;

    const result = await this.request<TBaseResponse<RS_SubscriptionState>>(
      `${path}${purchaseToken}/state`,
    );

    return result.body.is_active;
  }

  /**
   * @see https://www.rustore.ru/help/work-with-rustore-api/api-upload-publication-app/get-version-status
   */
  public async getVersions(
    packageName: string,
    page = 0,
    size = 20,
  ): Promise<RS_VersionsResponse_Body> {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    const result = await this.request<TBaseResponse<RS_VersionsResponse_Body>>(
      `${Path.Version}${packageName}/version?${searchParams.toString()}`,
    );

    return result.body;
  }

  /**
   * @see https://www.rustore.ru/help/work-with-rustore-api/api-upload-publication-app/get-version-status
   */
  public async getVersion(
    packageName: string,
    version: number,
  ): Promise<RS_VersionsResponse_Body> {
    const searchParams = new URLSearchParams({
      ids: version.toString(),
    });

    const result = await this.request<TBaseResponse<RS_VersionsResponse_Body>>(
      `${Path.Version}${packageName}/version?${searchParams.toString()}`,
    );

    return result.body;
  }

  public async getLastActiveVersion(
    packageName: string,
  ): Promise<RS_LastActiveVersionResponse_Body | null> {
    const versions = await this.getVersions(packageName);
    const activeVersions = versions.content.filter(
      (version) => 'ACTIVE' === version.versionStatus,
    );

    if (0 === activeVersions.length) {
      return null;
    }

    return activeVersions[0];
  }

  private async request<T>(path: string) {
    try {
      const jwe = await this.auth.getJwe();

      const result = await this.httpClient.get<T>(path, {
        headers: { 'Public-Token': jwe },
      });

      return result.data;
    } catch (e: any) {
      throw new RuStoreError(getRustoreError(e));
    }
  }
}
