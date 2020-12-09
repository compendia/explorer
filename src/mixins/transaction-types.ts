import {
  CoreTransaction,
  FileTransaction,
  MagistrateTransaction,
  StakeTransaction,
  TypeGroupTransaction,
} from "@/enums";

const isCoreTypeGroup = (typeGroup: number): boolean => {
  return typeGroup === TypeGroupTransaction.CORE;
};

const isMagistrateTypeGroup = (typeGroup: number): boolean => {
  return typeGroup === TypeGroupTransaction.MAGISTRATE;
};

const isStakeTypeGroup = (typeGroup: number): boolean => {
  return typeGroup === TypeGroupTransaction.STAKE;
};

const isFileTypeGroup = (typeGroup: number): boolean => {
  return typeGroup === TypeGroupTransaction.FILE;
};

export default {
  methods: {
    isTransfer(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.TRANSFER;
    },

    isSecondSignature(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.SECOND_SIGNATURE;
    },

    isDelegateRegistration(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.DELEGATE_REGISTRATION;
    },

    isVote(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.VOTE;
    },

    isMultiSignature(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.MULTI_SIGNATURE;
    },

    isIpfs(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.IPFS;
    },

    isDelegateResignation(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.DELEGATE_RESIGNATION;
    },

    isMultiPayment(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.MULTI_PAYMENT;
    },

    isTimelock(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.TIMELOCK;
    },

    isTimelockClaim(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.TIMELOCK_CLAIM;
    },

    isTimelockRefund(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.TIMELOCK_REFUND;
    },

    isBusinessRegistration(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BUSINESS_REGISTRATION;
    },

    isBusinessResignation(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BUSINESS_RESIGNATION;
    },

    isBusinessUpdate(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BUSINESS_UPDATE;
    },

    isBridgechainRegistration(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BRIDGECHAIN_REGISTRATION;
    },

    isBridgechainResignation(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BRIDGECHAIN_RESIGNATION;
    },

    isBridgechainUpdate(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BRIDGECHAIN_UPDATE;
    },

    isStakeCreate(type: number, typeGroup: number): boolean {
      return isStakeTypeGroup(typeGroup) && type === StakeTransaction.STAKE_CREATE;
    },

    isStakeRedeem(type: number, typeGroup: number): boolean {
      return isStakeTypeGroup(typeGroup) && type === StakeTransaction.STAKE_REDEEM;
    },

    isStakeCancel(type: number, typeGroup: number): boolean {
      return isStakeTypeGroup(typeGroup) && type === StakeTransaction.STAKE_CANCEL;
    },

    isStakeExtend(type: number, typeGroup: number): boolean {
      return isStakeTypeGroup(typeGroup) && type === StakeTransaction.STAKE_EXTEND;
    },

    isSetFile(type: number, typeGroup: number): boolean {
      return isFileTypeGroup(typeGroup) && type === FileTransaction.SET_FILE;
    },
  },
};
