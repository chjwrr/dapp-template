import './index.less'
import commonStyles from '../../Common/common.less'
import { formatAccount } from '@/Common';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { connect,disconnect } from '@wagmi/core'
import { useAccount } from 'wagmi';

import { coinbaseWallet, injected, safe, walletConnect } from 'wagmi/connectors'
import { projectId, wagmiConfig } from '@/provider/Web3ModalProvider';


export default function ConnectWallet() {
  const {open,close} = useWeb3Modal()
  const {address} = useAccount()
  function onConnect(){
    open && open()
  }
  async function onCustomWallet(){
    const connectInfo = await connect(wagmiConfig,{
      connector:injected({})
    })

    console.log('链接钱包成功',connectInfo)
  }
  async function onMetamask(){
    const connectInfo = await connect(wagmiConfig,{
      connector:injected({ target: 'metaMask' }) 
    })
    console.log('链接钱包成功',connectInfo)
    // 重要，不使用open方法链接钱包的，刷新后不会自动连接，需加上这句话
    // localStorage.setItem('wagmi.injected.shimDisconnect', "1")
  }
  async function onCoinbaseWallet(){
    const connectInfo = await connect(wagmiConfig,{
      connector:coinbaseWallet({
        appName:''
      })
    })

    console.log('链接钱包成功',connectInfo)
  }
  async function onWalletConnect(){
    const connectInfo = await connect(wagmiConfig,{
      connector:walletConnect({
        projectId:projectId
      })
    })

    console.log('链接钱包成功',connectInfo)
  }
  const {t} = useTranslationLanguage()
  return <div className={`${commonStyles.row} walletView`}>
    <img className='walletIcon' src='/images/walleticon.png'/>
    <span className='address'>{address ? formatAccount(address) : 'Connect Wallet'}</span>

    <button onClick={onMetamask}>Metamask</button>
    <button onClick={onCoinbaseWallet}>CoinbaseWallet</button>
    <button onClick={onWalletConnect}>WalletConnect</button>

  </div>
}