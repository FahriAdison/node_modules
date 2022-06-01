import type { Logger } from 'pino';
import { proto } from '../../WAProto';
import { AccountSettings, BaileysEventMap, SignalKeyStoreWithTransaction } from '../Types';
declare type ProcessMessageContext = {
    historyCache: Set<string>;
    downloadHistory: boolean;
    meId: string;
    keyStore: SignalKeyStoreWithTransaction;
    accountSettings: AccountSettings;
    logger?: Logger;
    treatCiphertextMessagesAsReal?: boolean;
};
/** Cleans a received message to further processing */
export declare const cleanMessage: (message: proto.IWebMessageInfo, meId: string) => void;
declare const processMessage: (message: proto.IWebMessageInfo, { downloadHistory, historyCache, meId, keyStore, accountSettings, logger, treatCiphertextMessagesAsReal }: ProcessMessageContext) => Promise<Partial<BaileysEventMap<any>>>;
export default processMessage;
