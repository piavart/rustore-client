export enum RS_InvoiceStatus {
  Created = 'created',
  Executed = 'executed',
  Cancelled = 'cancelled',
  Paid = 'paid',
  Confirmed = 'confirmed',
  Reversed = 'reversed',
  Refunded = 'refunded',
}

type TPurchase_Error = {
  readonly user_message: string;
  readonly error_description: any;
  readonly error_code: number;
};

type TPurchase_Invoice_Order = {
  readonly order_id: string;
  readonly order_number: string;
  readonly order_date: string;
  readonly service_id: string;
  readonly amount: number;
  readonly currency: string;
  readonly purpose: string;
  readonly description: string;
  readonly language: string;
  readonly expiration_date: string;
  readonly tax_system: number;
  readonly trade_name: string;
  readonly visual_name: string;
  readonly org_name: string;
  readonly org_inn: string;
  readonly visual_amount: string;
  readonly order_bundle: any;
};

type TPurchase_Invoice_Purchaser = {
  readonly email: string;
  readonly phone: string;
  readonly contact: string;
};

type TPurchase_Invoice = {
  readonly purchaser: TPurchase_Invoice_Purchaser;
  readonly delivery_info: {
    readonly address: any;
    readonly delivery_type: string;
    readonly description: string;
  };
  readonly invoice_params: { key: string; value: string }[];
  readonly order: TPurchase_Invoice_Order;
};

type TPurchase_PaymentInfo_DeviceInfo = {
  readonly device_platform_type: string;
  readonly device_platform_version: string;
  readonly device_model: string;
  readonly device_manufacturer: string;
  readonly device_id: string;
  readonly surface: string;
  readonly surface_version: string;
};

type TPurchase_PaymentInfo = {
  readonly payment_date: string;
  readonly payment_id: string;
  readonly payment_params: { key: string; value: string };
  readonly device_info: TPurchase_PaymentInfo_DeviceInfo;
  readonly loyalty_info: Record<string, string | number>;
  readonly card_id: string;
  readonly name: string;
  readonly paysys_code: string;
  readonly masked_pan: string;
  readonly expiry_date: string;
  readonly cardholder: string;
  readonly payment_system: string;
};

// Docs: https://help.rustore.ru/rustore/for_developers/work_with_RuStore_API/subscription_RuStore_API/public_api_1
export type RS_Purchace = {
  readonly error: TPurchase_Error;
  readonly invoice_id: string;
  readonly invoice_date: string;
  readonly invoice_status: RS_InvoiceStatus;
  readonly invoice: TPurchase_Invoice;
  readonly application_code: string;
  readonly application_name: string;
  readonly owner_code: string;
  readonly owner_name: string;
  readonly payment_info: TPurchase_PaymentInfo;
};

export enum RS_SubscriptionStatus {
  // Active status
  ACTIVATED = 'ACTIVATED',
  // Intermediate statuses
  ACCEPTED = 'ACCEPTED',
  DEPOSITED = 'DEPOSITED',
  CLOSE_PENDING = 'CLOSE_PENDING',
  REPEATING = 'REPEATING',
  // Finnaly statuses
  DECLINED = 'DECLINED',
  GRACE = 'GRACE',
  HOLD = 'HOLD',
  CANCELED = 'CANCELED',
  CLOSED = 'CLOSED',
  REFUNDED = 'REFUNDED',
}

export enum RS_SubscriptionPeriod {
  PROMO = 'PROMO',
  START = 'START',
  STANDARD = 'STANDARD',
  GRACE = 'GRACE',
  HOLD = 'HOLD',
}

export enum RS_SubscriptionPeriodType {
  DAY = 'DAY',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

type RS_Subscription_Period = {
  readonly periodName: RS_SubscriptionPeriod;
  readonly periodType: RS_SubscriptionPeriodType;
  readonly periodDuration: number;
  readonly periodPrice: number;
  readonly nextPeriod: RS_SubscriptionPeriod;
};

export type RS_Subscription = {
  readonly serviceName: string;
  readonly subscriptionId: number;
  readonly addParameters: string;
  readonly productType: string;
  readonly productName: string;
  readonly productCode: string;
  readonly recurrent: boolean;
  readonly countOfDay: number;
  readonly periodType: string;
  readonly periodDuration: number;
  readonly nextPaymentDate: string;
  readonly price: number;
  readonly currency: string;
  readonly imageUrl: string;
  readonly state: RS_SubscriptionStatus;
  readonly currentPeriod: RS_SubscriptionPeriod;
  readonly debtPaymentPeriod: string | null;
  readonly description: string;
  readonly tariffId: number;
  readonly periods: RS_Subscription_Period[];
};

export type RS_SubscriptionResponse_Body = {
  readonly code: number;
  readonly success: boolean;
  readonly message: string;
  readonly body: RS_Subscription;
};

export type RS_SubscriptionState = {
  readonly is_active: boolean;
};

export type RS_Version = {
  versionId: number;
  appName: string;
  appType: 'MAIN' | 'GAME';
  versionName: string;
  versionCode: number;
  versionStatus:
    | 'ACTIVE'
    | 'PARTIAL_ACTIVE'
    | 'READY_FOR_PUBLICATION'
    | 'PREVIOUS_ACTIVE'
    | 'ARCHIVED'
    | 'REJECTED_BY_MODERATOR'
    | 'TAKEN_FOR_MODERATION'
    | 'MODERATION'
    | 'AUTO_CHECK'
    | 'AUTO_CHECK_FAILED'
    | 'DRAFT'
    | 'DELETED_DRAFT'
    | 'REJECTED_BY_SECURITY';
  publishType: 'MANUAL' | 'INSTANTLY' | 'DELAYED';
  publishDateTime: string;
  sendDateForModer: string;
  partialValue: number;
  whatsNew: string;
  priceValue: number;
  paid: boolean;
};

export type RS_VersionStatusResponse_Body = {
  readonly content: Array<RS_Version>;
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly totalElements: number;
  readonly totalPages: number;
};
