import { TokenModel } from "../../token-repository/models/token.dto";

export interface TradeModel {
  trader: string;
  plattform: string;
  tokenIn: string;
  tokenOut: string;
  tokenInAmount: number;
  tokenOutAmount: number;
  chainId: number;
  txHash: string;
  profit: number;
  sell?: TradeModel;
  tokenInModel?: TokenModel
  tokenOutModel?: TokenModel
  timestamp: Date;
}
