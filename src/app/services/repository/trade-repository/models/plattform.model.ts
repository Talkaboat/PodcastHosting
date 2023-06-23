export interface PlattformModel {
  name?: string;
  router: string;
  chainId: number;
  factory?: string;
  version: PlattformVersion;
  fee: number;
}

export enum PlattformVersion {
  V1,
  V2,
  V3
}
