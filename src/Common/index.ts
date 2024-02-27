
export const colors:Record<string,string> = {
  main:'red'
}

export const RefreshConfig:Record<string,number> = {
  refreshInterval:1000 * 60 * 10,
  longRefreshInterval:1000 * 60 * 20,
  shortRefreshInterval:1000 * 60 * 5,
}

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD'

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED
}

export function formatBalance(s: string | number, decimals = 4): string {
    const init = 0;
    if (isNaN(Number(s))) {
        return floorFixed(init, decimals).toString()
    }
    return s ? floorFixed(s, decimals).toString() : floorFixed(init, decimals).toString()
}

function floorFixed(s: string | number, decimals = 4) {
    s = Number(s)
    return Math.floor(s * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

export function formatPercent(s: string | number, decimals = 2): string {
    if (Number(s) / 100 > 999999) {
        return '999999%'
    }
    return s ? (Number(s) * 100).toFixed(decimals) + '%' : '0%'
}

export function formatAccount(account: string | undefined, decimals = 4) {
    if (!account) {
        return ""
    }
    return account.slice(0, 2) + account.slice(2, decimals + 2) + '****' + account.slice(-decimals);
}

export function timeToH_M_S(time: number) {
    const check = (num: number) => {
        if (num < 10) {
            return '0' + num
        }
        return num
    }
    let min = Math.floor(time % 3600);
    return check(Math.floor(time / 3600)) + ':' + check(Math.floor(min / 60)) + ':' + check(time % 60)
}

export function padString(str: string | undefined | number, decimals = 4) {
    if (!str) {
        return ''
    }
    return String(str).padStart(decimals, '0')
}

export function scrollToAnchor(anchorName: string) {
    if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        if (anchorElement) { anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
    }
}

export function isAndroid() {
  return typeof navigator !== "undefined" && /android/i.test(navigator.userAgent);
}

export function isSmallIOS() {
  return typeof navigator !== "undefined" && /iPhone|iPod/.test(navigator.userAgent);
}

export function isLargeIOS() {
  return typeof navigator !== "undefined" && (/iPad/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

export function isIOS() {
  return isSmallIOS() || isLargeIOS();
}

export function getContractErrorMsg(message:any){
  if (!message)return ''
  let msg = String(message)
  const result = msg.split('\n')
  return result[1] ||  result[result.length - 2]
}