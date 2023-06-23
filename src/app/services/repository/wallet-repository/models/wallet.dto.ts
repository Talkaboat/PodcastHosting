import { TokenModel } from "../../token-repository/models/token.dto";

export interface WalletModel {
  address: string;
  tokens: TokenModel[];
  profitPerformance: number;
  trades: number;
  maxDrawdown: number;
}
