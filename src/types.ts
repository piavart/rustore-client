export type TBaseResponse<
  TBody extends Record<string, any> | undefined = undefined,
> = {
  readonly code: 'OK';
  readonly message: null;
  readonly body: TBody;
  readonly timestamp: string;
};

export type TErrorResponse = {
  readonly code: 'ERROR' | 'BAD_REQUEST' | 'NOT_FOUND';
  readonly message: string;
  readonly timestamp: string;
};

export type TAuthResponse = TBaseResponse<{
  readonly jwe: string;
  readonly ttl: number;
}>;
