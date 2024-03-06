import './index.less'
import 'animate.css'
import 'react-photo-view/dist/react-photo-view.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/Common/common.less'
import 'aos/dist/aos.css';
import { ToastInit } from '@/Components/Toast';
import { TransactionLoadingInit } from '@/Components/TransactionLoading';
import ProviderConfig from '@/provider';
import AOS from 'aos';

// import * as Sentry from "@sentry/react";

// Sentry.init({
//   dsn: "https://0d44e4611478f87af0ad3ec4badceada@o4505752206049280.ingest.sentry.io/4506835260801024",
//   integrations: [
//     Sentry.browserTracingIntegration(),
//     Sentry.replayIntegration({
//       maskAllText: false,
//       blockAllMedia: false,
//     }),
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions
//   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//   tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });



ToastInit()
TransactionLoadingInit()
AOS.init();

export default function Layout() {
  return (
    <ProviderConfig/>
  );
}