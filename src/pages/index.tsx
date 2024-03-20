import { useSendTransaction, useTest } from '@/Contract'
import './index.less'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useChainId } from 'wagmi'
import { TEST_TOKEN, USDT_TOKEN, ZNBPleiadePlan_CONTRACT } from '@/Contract/addresses'
import { parseUnits } from 'viem'
import { useApprove, useWalletInfo } from '@/hooks/useTokenContract'
import { ApprovalState, formatAccount } from '@/Common'
import { TransLoadingConfirm, TransLoadingError, TransLoadingPending, TransLoadingSuccess } from '@/Components/TransactionLoading'
import { changeThem } from '@/Redux/setting'
import { useDispatch } from 'react-redux'
import { LoadingCircle, LoadingCircleBg, LoadingLottieDots, LoadingSignal } from '@/Components/LoadingButton'
import { animate, useAnimate, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
export default function HomePage() {
  const { open, close } = useWeb3Modal()
  const {address} = useAccount()
  const a = useTest()
  const walletInfo = useWalletInfo()
  const chainID = useChainId()

  function onClick(){
    open()
  }
  const sendTransaction = useSendTransaction()

  const [approveStatus,approve] = useApprove(TEST_TOKEN.addresses,ZNBPleiadePlan_CONTRACT.addresses,approveSuccess,1000)
  const [approveUStatus,approveU] = useApprove(USDT_TOKEN.addresses,ZNBPleiadePlan_CONTRACT.addresses,approveSuccess,100)

  function approveSuccess(){
    console.log('approve success！！')
  }
  async function onMint(){

    if (approveStatus != ApprovalState.APPROVED){
      approve && approve()
      return
    }
    if (approveUStatus != ApprovalState.APPROVED){
      approveU && approveU()
      return
    }
    sendTransaction.mutate({
      title:'Stake',
      contract:ZNBPleiadePlan_CONTRACT,
      funcName:'buyEquityPackage',
      args:['PHLO',parseUnits('100',18),200],
      onSuccess:(hash:any)=>{
      },
      onError:(e:any)=>{
      }
    })
  }


  const controls = useAnimation();
  
  
  const inViewRef = useRef(null)
  const isInView = useInView(inViewRef,{once:true})

  useEffect(()=>{
    console.log('isInView===',isInView)
    if (isInView){
      //todo
    }
  },[isInView])

  return (
    <div>
      <h2 style={{color:'#000'}}>Yay! Welcome to umi!</h2>
      <button className='button' onClick={onClick}>{address || '链接钱包'}</button>
      <button className='button' onClick={onMint}>调用合约方法</button>


      <LoadingCircle/>
      <LoadingCircleBg/>
      <div style={{height:100}}>
        <LoadingSignal/>
      </div>
      <LoadingLottieDots/>

      <div className='fadeUp' data-aos='fade-up'></div>
      <div className='fadeUp' data-aos='fade-up'></div>

      <div ref={inViewRef} style={{
        width:200,
        height:200,
        background:'blue',
        marginTop:300
      }}></div>

        <div className="arrow" style={{background:'red',width:15, height:15 }}>
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </div>
        <button onClick={()=>{
          animate(".arrow", { rotate: 180, scale:3, x:100, width:30, height:30 }, { duration: 1 });
        }}>点击执行动画1</button>
        <button onClick={()=>{
          animate(".arrow", { rotate: 0, scale:1.1, x:0, width:15, height:15 }, { duration: 1 });
        }}>点击执行动画2</button>
    </div>
  );
}
