import { ChainID } from './chains';
import ERC20_ABI from '@/ABI/ERC20.json';
import TestContact_ABI from '@/ABI/TestContact.json'
import ZNBPleiadePlan_ABI from '@/ABI/ZNBPleiadePlan.json'

export interface AddressMap {
  [cid:number]:`0x${string}`
}
export interface ContractInterface {
  abi:any,
  addresses:AddressMap
}



export const TEST_TOKEN:ContractInterface = {
  abi:ERC20_ABI,
  addresses:{
    [ChainID.BSC_TESTNET]:'0xAb0E87712481aA6F59CE53113dc97410feF658A6',
  }
};

export const USDT_TOKEN:ContractInterface = {
  abi:ERC20_ABI,
  addresses:{
    [ChainID.BSC_TESTNET]:'0x49509869e7CaF5f50cf8d7bA6692cA3C70F11234',
    [ChainID.MATCH_TESTNET]:'0x8e6916bE1968b9211a5eCD019F6466b0Ce396597',
    [ChainID.BSC]: "0x55d398326f99059fF775485246999027B3197955",
  }
};


export const TEST_CONTRACT:ContractInterface = {
  abi:TestContact_ABI,
  addresses:{
    [ChainID.BSC]: "0x904AF34F01D3bA83923557A453615EFa1CBD06Ca",
  }
};

export const ZNBPleiadePlan_CONTRACT:ContractInterface = {
  abi:ZNBPleiadePlan_ABI,
  addresses:{
    [ChainID.BSC]: "0xB82d4bb63B9641545a308Bc74B212561E8f016B0",
    [ChainID.BSC_TESTNET]: "0xB82d4bb63B9641545a308Bc74B212561E8f016B0",
  }
};