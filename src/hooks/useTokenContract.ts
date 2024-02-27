import ERC20_ABI from '@/ABI/ERC20.json';
import { useQuery } from '@tanstack/react-query'
import { ApprovalState, RefreshConfig, formatBalance, getContractErrorMsg } from '@/Common';
import { useContext, useState, useEffect, useCallback } from 'react';
import { AddressMap } from './../Contract/addresses';
import { useAccount, useChainId, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import walletTokens from '@/Contract/walletTokens';
import { TransLoadingConfirm, TransLoadingError, TransLoadingPending, TransLoadingSuccess } from '@/Components/TransactionLoading';
import { formatUnits, maxUint256 } from 'viem';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { publicClient } from '@/provider/Web3ModalProvider';

export function useTokenAllowance(tokenAddress:AddressMap,contractAddress:AddressMap){
  const chainID = useChainId()
  const {address} = useAccount()
  return useReadContract({
    address: tokenAddress[chainID],
    abi: ERC20_ABI,
    functionName: 'allowance',
    args:[address,contractAddress[chainID]]
  })
}

export function useApprove(tokenAddressMap: AddressMap, spenderAddressMap: AddressMap,approveSuccess?:()=>void,cost?:string | number): [ApprovalState, () => Promise<void>] {
  const {address} = useAccount()
  const chainID = useChainId()
  const {open} = useWeb3Modal()
  const {data:allowanceData,refetch}:any = useTokenAllowance(tokenAddressMap, spenderAddressMap);
  const [approvalState, setApproveState] = useState(ApprovalState.UNKNOWN);
  // console.log('allowanceData====',allowanceData,tokenAddressMap)
  const {writeContract,writeContractAsync,data:hash,error,isError} = useWriteContract()
  const {isLoading,isPending,isSuccess,isError:waitIsError,data:waitData,error:waitError} = useWaitForTransactionReceipt({hash})

  useEffect(()=>{
    if (isError){
      TransLoadingError(getContractErrorMsg(error),'',chainID)
    }
  },[isError])

  useEffect(()=>{
    if (waitIsError){
      TransLoadingError(getContractErrorMsg(waitError),hash || '',chainID)
    }
  },[waitIsError])

  useEffect(()=>{
    if (isLoading){
      TransLoadingPending(hash || '', chainID)
    }
  },[isLoading])

  useEffect(()=>{
    if (isSuccess){
      TransLoadingSuccess(hash || '', chainID)
      refetch()
      approveSuccess && approveSuccess()
    }
  },[isSuccess])
  useEffect(() => {
    if (allowanceData == undefined || allowanceData == null){
      setApproveState(ApprovalState.UNKNOWN);
    }else {
      const allowance = Number(formatUnits(allowanceData || 0,18))
      if (allowance == 0 || allowance < Number(cost)) {
        setApproveState(ApprovalState.NOT_APPROVED);
      } else {
        setApproveState(ApprovalState.APPROVED);
      }
    }
  }, [allowanceData,cost])

  const approve = useCallback(async (): Promise<void> => {
    if (!address || !chainID){
      open && open()
      return
    }

    const contractAddress = spenderAddressMap[chainID];
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily');
      return;
    }
    if (!contractAddress) {
      console.error("Contract doesn't exist on current network. Please switch networks.")
      return
    }
    TransLoadingConfirm('Approve')
    const transParams = {
      abi:ERC20_ABI,
      address:tokenAddressMap[chainID],
      args:[contractAddress,maxUint256],
      functionName:'approve'
    }
    console.log('transParams',transParams)
    writeContract(transParams)
  }, [approvalState, tokenAddressMap, spenderAddressMap, cost]);
  return [approvalState, approve];
}

export function useWalletInfo(){
  const { address } = useAccount()
  const chainID = useChainId()

  async function fetchData(){
    if (!address || !chainID){
      return
    }
    let callContextArr:any = []
    walletTokens.forEach((item: any, index: number) => {
      callContextArr.push({
        address:item.address[chainID],
        abi:ERC20_ABI,
        functionName:'balanceOf',
        args:[address]
      },)
    })

    const results:any = await publicClient.multicall({
      contracts:callContextArr
    })
    const nativeToken = await publicClient.getBalance({address})

    const walletBalance:any = {}
    walletBalance['NATIVE'] = formatUnits(nativeToken,18)
    walletTokens.forEach((item: any, index: number) => {
      if (results[index].status == "success"){
        walletBalance[item.name] = formatUnits(results[index].result,item.decimals)
      }
    })

    console.log('walletBalance==',walletBalance)
    return walletBalance
  }
  return useQuery({
    queryKey:["useWalletInfo"],
    queryFn:fetchData,
    enabled:!!chainID && !!address,
    refetchInterval: RefreshConfig.shortRefreshInterval,
  })
}
