"use server";

import styles from './page.module.css'
import { Provider } from "@/components/ui/provider";
import LowerBanner from "./components/client/LowerBanner";
import BlockDisplay from './components/client/Block/BlockDisplay';
import { myFrontendProviders } from '@/utils/constants';

export default async function Page() {





  return (
    <Provider>
      <div>
        <p className={styles.bgText}>
          Test Websocket of Starknet Rpc 0.8 <br></br>
        </p>
        <div>

        </div>
        <BlockDisplay ></BlockDisplay>
        <LowerBanner></LowerBanner>
      </div >
    </Provider >
  )
}


