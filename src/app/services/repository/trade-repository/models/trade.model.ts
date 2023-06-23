import { TokenModel } from "../../token-repository/models/token.dto";
import { PlattformModel } from "./plattform.model";

export interface TradeModel {
  trader: string;
  plattform: PlattformModel;
  tokenIn: string;
  tokenOut: string;
  tokenInAmount: number;
  tokenOutAmount: number;
  chainId: number;
  txHash: string;
  profit: number;
  averageSellprice: number;
  tokensSold: number;
  tokenInPrice: number;
  tokenOutPrice: number;
  sell?: TradeModel;
  tokenInData?: TokenModel
  tokenOutData?: TokenModel
  timestamp: Date;
}
