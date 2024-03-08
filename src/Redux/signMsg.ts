import { RootState } from './index';
import { useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SignMsgInterFace {
  expiredTime:number,
  signMessage:string
}

const initialState:Record<string,SignMsgInterFace> = {
  signInfo:{
    expiredTime:0,
    signMessage:''
  }
}

export function useSignMsgInfo(): SignMsgInterFace {
  return useSelector((state: RootState) => state.signMsg.signInfo)
}

const signMsgSlice = createSlice({
  name: 'signMsg',
  initialState,
  reducers: {
    resetSignMsgInfo:(state,action:PayloadAction<SignMsgInterFace>)=>{
      state.signInfo = action.payload
    },
  }
})

export const { resetSignMsgInfo } = signMsgSlice.actions
export default signMsgSlice.reducer

