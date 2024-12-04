"use client";
import { useEffect, useState, useRef, type MutableRefObject } from 'react';
import { WebSocketChannel, WSSubscriptions, } from "starknet";
import { useStoreBlock } from "./blockContext";
import { Text, Separator } from "@chakra-ui/react";
import styles from '../../../page.module.css'
import { BLOCK_HEADER, RESOURCE_PRICE, L1_DA_MODE, SubscriptionNewHeadsResponse } from "@starknet-io/types-js";
import { WSurl } from '@/utils/constants';


export default function BlockDisplay() {
  // block context
  const blockFromContext = useStoreBlock(state => state.dataBlock);
  const setBlockData = useStoreBlock((state) => state.setBlockData);

  // local
  const myWebSocket: MutableRefObject<WebSocketChannel | undefined> = useRef();
  const [myNewHeadsID, setMyNewHeadsID] = useState<number | false>(false);

  useEffect(() => {
    async function initWS() {
      const myWS = new WebSocketChannel({ nodeUrl: WSurl });
      if (myWS) {
        try {
          const state: number = await myWS.waitForConnection();
          console.log("WebSocketChannel connected =", myWS.isConnected(), "state =", state === (WebSocket.OPEN) ? "OPEN" : "NOT OPEN");
        }
        catch (err: any) {
          console.log("Error WS connection =", err);
        }
        if (myWS.isConnected()) {
          myWebSocket.current = myWS;
          try {
            const newHeadsID: number | false = await myWS.subscribeNewHeads();
            console.log("newHeadsID =", newHeadsID);
            if (!newHeadsID) {
              console.log("newHead subscription failed.");
            }
            else {
              console.log("newHead subscription success.");
              setMyNewHeadsID(newHeadsID);
              myWS.onNewHeads = (newHead: SubscriptionNewHeadsResponse) => {
                console.log("**** newHead event received =", newHead);
                setBlockData(newHead.result);
              };
              myWebSocket.current = myWS;
            }
          }
          catch {
            console.log("WS has been disconnected");
          }
        }
        else {
          console.log("WS not connected.");
        }
      }
      else {
        console.log("No WebSocketChannel instance.");
      }
    };
    initWS();

    return () => {
      async function stopWS() {
        console.log("close WebSocket...");
        const myWS = myWebSocket.current;
        if (myWS) {
          console.log("stop subscription newHeads...");
          try {
            const newHeadsId = myWS.subscriptions.get(WSSubscriptions.NEW_HEADS);
            console.log("Close newHead ID =", newHeadsId);
            const status: boolean = await myWS.unsubscribeNewHeads();
            console.log("unsubscribe newHeads =", status);
            const subscriptionId = await myWS.waitForUnsubscription(newHeadsId);
            console.log("Unsubscribe newHeads completed", { subscriptionId });
          } catch (err: any) {
            console.log("error Unsubscribe", err);
          };
          console.log("stop WS...");
          try {
            myWS.disconnect();
            console.log("Disconnection request done");
            const status: WebSocket = await myWS.waitForDisconnection();
            console.log("Disconnected", status);
          } catch (err: any) {
            console.log("error Disconnection WS", err)
          }
          console.log("After disconnect. Connected4 =", myWS.isConnected());
        }
        else {
          console.log("No WebSocketChannel");
        }
      };
      stopWS();
    }
  }
    , []);

  return (
    <>
      {
        !blockFromContext.block_number ? (
          <Text>Waiting WebSocket next block head... </Text>
        ) : (
          <>
            <Text className={styles.text1}>BlockNumber = {blockFromContext.block_number}  </Text>
            <Text className={styles.text1}>BlockHash = {blockFromContext.block_hash}  </Text>
            <Text className={styles.text1}>BlockTimeStamp = {blockFromContext.timestamp}  </Text>
            <Text className={styles.text1}>BlockGasprice = {JSON.stringify(blockFromContext.l2_gas_price)}  </Text>
          </>
        )}
      <Separator />
      {myNewHeadsID && <Text>newHeads {myNewHeadsID}</Text>}
    </>
  )
}