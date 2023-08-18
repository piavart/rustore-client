import { TErrorResponse } from './types';

export class RuStoreError extends Error {
  constructor(public readonly data: TErrorResponse) {
    super(data.message);
  }
}
