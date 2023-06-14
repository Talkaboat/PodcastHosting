import { TokenModel } from "../../token-repository/models/token.dto";

export interface WalletModel {
  address: string;
  tokens: TokenModel[];
}
