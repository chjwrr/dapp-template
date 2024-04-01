import { useSendTransaction, useTest } from '@/Contract'
import './index.less'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { cookieStorage, useAccount, useChainId } from 'wagmi'
import { TEST_TOKEN, USDT_TOKEN, ZNBPleiadePlan_CONTRACT } from '@/Contract/addresses'
import { parseUnits } from 'viem'
import { useApprove, useWalletInfo } from '@/hooks/useTokenContract'
import { ApprovalState, formatAccount } from '@/Common'
import { TransLoadingConfirm, TransLoadingError, TransLoadingPending, TransLoadingSuccess } from '@/Components/TransactionLoading'
import { changeThem } from '@/Redux/setting'
import { useDispatch } from 'react-redux'
import { LoadingCircle, LoadingCircleBg, LoadingLottieDots, LoadingSignal } from '@/Components/LoadingButton'
import { animate, useAnimate, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { CONTACT_LIST } from './dataSource'
import BigNumber from 'bignumber.js'
import useTranslationLanguage from '@/hooks/useTranslationLanguage'

export default function HomePage() {
  const {t,language} = useTranslationLanguage()
  return (
    <div>
      <div className='rowCenter header'>
        <div className='title'>Header {t('home.title')}{language}{t('home.detail.title')}</div>
      </div>
      <div className='column content'>
        {
          Object.keys(CONTACT_LIST).map((item:string,index:number)=>{
            return <div className='column' key={item+'header'}>
              <div className='row listHeader'>{item}</div>
              {
                CONTACT_LIST[item].map((it:string,ind:number)=>{
                  return <div className='listItem' key={item + it+'headerItem'+index}>{it}</div>
                })
              }
            </div>
          })
        }
        <div className='columnCenter posterIv_1'>
          <div className='rowBetween posterView'>
            <div className='posterTitle'>THREE SUNS BALM</div>
            <div className='posterTitle'>£ 55</div>
          </div>
        </div>

        <div className='columnCenter posterIv_1 posterIv_2'>
          <div className='rowBetween posterView'>
            <div className='posterTitle'>AERATE FACE TOWEL</div>
            <div className='posterTitle'>£ 25</div>
          </div>
        </div>

        <div className='columnCenter posterIv_1 posterIv_3'>
          <div className='rowBetween posterView'>
            <div className='posterTitle'>ACTIVE RECOVERY BROTH</div>
            <div className='posterTitle'>£ 110</div>
          </div>
        </div>

      </div>
      {/* <BottomView/>


      <div className='rowCenter bottom4'></div> */}

    </div>
  );
}

function BottomView(){
  const scalValue = 100 // 屏幕滚动100px，图片从 1 缩放到 0.8
  const screenWidth = window.screen.availWidth // 当前屏幕宽度,滚动当前屏幕宽度，下一个图片出现在屏幕中

  const bottomViewTopRef = useRef(0)
  useEffect(()=>{
    const bottomImageViewEle = document.getElementById('bottomImageView')
    if (bottomImageViewEle){
      bottomViewTopRef.current = bottomImageViewEle.getBoundingClientRect().top + window.scrollY
      console.log('getBoundingClientRect==',bottomImageViewEle.getBoundingClientRect())
      console.log('bottomViewTop==',bottomViewTopRef.current)

    }
  },[])

  useEffect(()=>{
    const imageViewEle = document.getElementById('imageView')
    const iv1Ele = document.getElementById('iv1')
    const iv2Ele = document.getElementById('iv2')
    const iv3Ele = document.getElementById('iv3')

    window.addEventListener('scroll',()=>{
      console.log('addEventListener',window.scrollY,'bottomViewTop',bottomViewTopRef.current)
      // 减去顶部导航栏高度
      let scrollValue = 0
      if (bottomViewTopRef.current - window.scrollY - 80 <= 0){
        scrollValue = window.scrollY - bottomViewTopRef.current + 80
        console.log('开始执行动画！！！！已滚动：',scrollValue)
      }

      /**
        0 < scrollValue <scalValue
        第一张图缩放0.8 (先滚动scalValue)

        scalValue < scrollValue <scalValue + 屏幕宽度
        第二张图滚动到当前位置(再滚动一个屏幕的宽度)

        scalValue + 屏幕宽度 < scrollValue < scalValue + 屏幕宽度 + scalValue
        第二张图缩放到1 (再滚动scalValue)

        scalValue + 屏幕宽度 + scalValue < scrollValue < scalValue + 屏幕宽度 + scalValue + scalValue
        第二张图缩放到0.8 (再滚动scalValue)

        scalValue + 屏幕宽度 + scalValue + scalValue < scrollValue < scalValue + 屏幕宽度 + scalValue + scalValue + 屏幕宽度
        第三张图滚动到当前位置 (再滚动一个屏幕的宽度)

        scalValue + 屏幕宽度 + scalValue + scalValue + 屏幕宽度 < scrollValue < scalValue + 屏幕宽度 + scalValue + scalValue + 屏幕宽度 + scalValue
        第三张图缩放到1  (再滚动scalValue)
      */
      if (imageViewEle && iv1Ele && iv2Ele && iv3Ele){
        if (scrollValue < 10){
          iv1Ele.style.transform = `scale(1)`
        }
        if (scrollValue > 10 && scrollValue < 50){
          iv1Ele.style.transform = `scale(0.8)`
        }

        // if (0 <= scrollValue && scrollValue <= scalValue){
        //   const rs = BigNumber(scrollValue).div(scalValue).times(0.2)
        //   const scale = BigNumber(1).minus(rs).toString()
        //   console.log('scale===',scale)
        //   iv1Ele.style.transform = `scale(${scale})`
        // }
        // if (scalValue < scrollValue && scrollValue < scalValue + screenWidth){
        //   const scrollValue1 = scrollValue - scalValue
        //   console.log('滚动',scrollValue1)
        //   imageViewEle.style.transform = `translateX(${-(scrollValue1 * 5)}px)`
        // }





      }
    })
  },[])

  return <div className='column bottom' id={'bottomImageView'}>
    <div className='row bottomV' id={'imageView'}>
      <img className='bottomImg' id='iv1' src='/images/bgw.png'/>
      <img className='bottomImg' id='iv2' style={{transform:'scale(0.8)'}} src='/images/bg.png'/>
      <img className='bottomImg' id='iv3' style={{transform:'scale(0.8)'}} src='/images/banner_title.png'/>
    </div>
    <div className='rowCenter bottom1'></div>
    <div className='rowCenter bottom2'></div>
    <div className='rowCenter bottom3'></div>
  </div>
}