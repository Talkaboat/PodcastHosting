import { TradeModel } from "./trade.model";

export interface TradeHistory {
    trades: TradeModel[];
    total: number;
    currentOffset: number;
}
