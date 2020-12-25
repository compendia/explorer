export enum CoreTransaction {
  TRANSFER = 0,
  SECOND_SIGNATURE = 1,
  DELEGATE_REGISTRATION = 2,
  VOTE = 3,
  MULTI_SIGNATURE = 4,
  IPFS = 5,
  MULTI_PAYMENT = 6,
  DELEGATE_RESIGNATION = 7,
  TIMELOCK = 8,
  TIMELOCK_CLAIM = 9,
  TIMELOCK_REFUND = 10,
}

export enum MagistrateTransaction {
  BUSINESS_REGISTRATION = 0,
  BUSINESS_RESIGNATION = 1,
  BUSINESS_UPDATE = 2,
  BRIDGECHAIN_REGISTRATION = 3,
  BRIDGECHAIN_RESIGNATION = 4,
  BRIDGECHAIN_UPDATE = 5,
}

export enum StakeTransaction {
  STAKE_CREATE = 0,
  STAKE_REDEEM = 1,
  STAKE_CANCEL = 2,
  STAKE_EXTEND = 3,
}

export enum FileTransaction {
  SET_FILE = 0,
}

export enum TypeGroupTransaction {
  CORE = 1,
  MAGISTRATE = 2,
  STAKE = 100,
  FILE = 101,
}

export enum ForgingStatus {
  Forging,
  Missing,
  NotForging,
  NeverForged,
  BecameActive,
}
