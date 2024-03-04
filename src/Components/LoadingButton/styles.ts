import styled, { css, keyframes } from "styled-components";
// https://juejin.cn/post/7037036742985121800

const rotateSqButtonAnimated = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
export const LoadingRotateView = styled.div`
  animation:${rotateSqButtonAnimated} 1s linear infinite;
  -moz-animation: ${rotateSqButtonAnimated} 1s linear infinite;
  -webkit-animation: ${rotateSqButtonAnimated} 1s linear infinite;
  -o-animation: ${rotateSqButtonAnimated} 1s linear infinite;
  /* background:red; */
  width:30px;
  height:30px;
  flex-direction:row;
  display:flex;
  justify-content:space-between;
  flex-wrap:wrap
`

const rotateSqButtonItemAnimated = keyframes`
  0% {
    transform: scale(1);
    opacity:1
  }
  50% {
    transform: scale(0.25);
    opacity:0.5
  }
  100% {
    transform: scale(1);
    opacity:1
  }
`
export const LoadingRotateViewItem1 = styled.div`
  animation:${rotateSqButtonItemAnimated} 1s linear infinite;
  -moz-animation: ${rotateSqButtonItemAnimated} 1s linear infinite;
  -webkit-animation: ${rotateSqButtonItemAnimated} 1s linear infinite;
  -o-animation: ${rotateSqButtonItemAnimated} 1s linear infinite;
  background:#FCD535;
  width:12px;
  height:12px;
  border-radius:50%
`
export const LoadingRotateViewItem2 = styled(LoadingRotateViewItem1)`
  animation:${rotateSqButtonItemAnimated} 1s linear -0.5s infinite;
  -moz-animation: ${rotateSqButtonItemAnimated} 1s linear -0.5s infinite;
  -webkit-animation: ${rotateSqButtonItemAnimated} 1s linear -0.5s infinite;
  -o-animation: ${rotateSqButtonItemAnimated} 1s linear -0.5s infinite;
`
export const LoadingRotateViewItem3 = styled(LoadingRotateViewItem1)`
  animation:${rotateSqButtonItemAnimated} 1s linear -1s infinite;
  -moz-animation: ${rotateSqButtonItemAnimated} 1s linear -1s infinite;
  -webkit-animation: ${rotateSqButtonItemAnimated} 1s linear -1s infinite;
  -o-animation: ${rotateSqButtonItemAnimated} 1s linear -1s infinite;
`
export const LoadingRotateViewItem4 = styled(LoadingRotateViewItem1)`
  animation:${rotateSqButtonItemAnimated} 1s linear -1.5s infinite;
  -moz-animation: ${rotateSqButtonItemAnimated} 1s linear -1.5s infinite;
  -webkit-animation: ${rotateSqButtonItemAnimated} 1s linear -1.5s infinite;
  -o-animation: ${rotateSqButtonItemAnimated} 1s linear -1.5s infinite;
`