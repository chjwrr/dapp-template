import {
  LoadingRotateView,
  LoadingRotateViewItem1,
  LoadingRotateViewItem2,
  LoadingRotateViewItem3,
  LoadingRotateViewItem4
} from "./styles";
import './index.less'
import Lottie from 'react-lottie';
// https://lottiefiles.com/free-animations/loading
import LoadingJson from '@/assets/lottlie/loading.json'


export function LoadingButtonIcon({position=false}:{position?:boolean}){
  return <LoadingRotateView style={{
    position:position ? 'absolute' : 'relative'
  }}>
    <LoadingRotateViewItem1/>
    <LoadingRotateViewItem2/>
    <LoadingRotateViewItem3/>
    <LoadingRotateViewItem4/>
  </LoadingRotateView>
}
interface LoadingType {
  width?:number,
  position?:boolean
}
export function LoadingCircle({width=20,position=false}:LoadingType){
  return <div className="loadingCircle" style={{
    width:width,
    height:width,
    position:position ? 'absolute' : 'relative'
  }}/>
}
export function LoadingCircleBg({width=20,position=false}:LoadingType){
  return <div className="loadingCirclebg" style={{
    width:width,
    height:width,
    position:position ? 'absolute' : 'relative'
  }}/>
}
export function LoadingSignal({width=20,position=false}:LoadingType){
  return <div className="loadingSignal" style={{
    position:position ? 'absolute' : 'relative'
  }}/>
}

export function LoadingLottieDots(){
  return <Lottie options={{
    loop: true,
    autoplay: true,
    animationData:LoadingJson,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }} style={{width:100,height:100}}/>
}



