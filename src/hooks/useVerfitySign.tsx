import { useAccount, useSignMessage } from "wagmi"
import useTranslationLanguage from "./useTranslationLanguage"
import { useDispatch } from "react-redux"
import dayjs from "dayjs"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ethers} from "ethers"
import { postRequest } from "@/API"
import { resetSignMsgInfo, useSignMsgInfo } from "@/Redux/signMsg"
import { TransLoadingConfirm, TransLoadingError } from "@/Components/TransactionLoading"

let currentSignTimer:number = 0
export default function useSignVerfityInfo(){
  const {address} = useAccount()
  const {t,language} = useTranslationLanguage()
  const dispatch = useDispatch()
  const {signMessageAsync} = useSignMessage()
  const signMsgInfo = useSignMsgInfo()

  const [signMsg,setSignMsg] = useState('')

  useEffect(()=>{
    if (address){
      const currentDate = dayjs().valueOf()
      console.log('currentDate',currentDate)

      if (signMsgInfo.signMessage && signMsgInfo.expiredTime > currentDate){
        setSignMsg(signMsgInfo.signMessage)
        console.log('signMsg available!')
      }else {
        console.log('the signMsg is expired or empty, go sign...')
        onSign()
      }
    }
  },[signMsgInfo,address])


  async function onSign(){
    const currentDate = dayjs().valueOf()

    if (currentDate < currentSignTimer + 3000){
      console.log('Do not request signature data repeatedly')
      return
    }
    currentSignTimer = currentDate

    TransLoadingConfirm('Signing')
    const signCode:any = await postRequest('API_SIGN_CODE',{},{headers:{address:address,lang:language}})
    if (!signCode){
      return
    }
    const signMsg = await signMessageAsync({
      message:signCode.signInfo.code
    })
    console.log('signMsg===',signMsg)

    dispatch(resetSignMsgInfo({
      expiredTime:Number(signCode.signInfo.expired_at) * 1000,
      signMessage:signMsg
    }))
    setSignMsg(signMsg)
  }

  return {signMsg,onSign}
}


export function useSign(){
  const {address} = useAccount()
  const {t,language} = useTranslationLanguage()
  const dispatch = useDispatch()
  const {signMessageAsync} = useSignMessage()

  async function onSign(){
    const currentDate = dayjs().valueOf()

    if (currentDate < currentSignTimer + 3000){
      console.log('Do not request signature data repeatedly')
      return
    }
    currentSignTimer = currentDate

    TransLoadingConfirm('Signing')
    const signCode:any = await postRequest('API_SIGN_CODE',{},{headers:{address:address,lang:language}})
    if (!signCode){
      return
    }
    const signMsg = await signMessageAsync({
      message:signCode.signInfo.code
    })
    console.log('signMsg===',signMsg)

    dispatch(resetSignMsgInfo({
      expiredTime:Number(signCode.signInfo.expired_at) * 1000,
      signMessage:signMsg
    }))
  }

  return {onSign}
}