import { create } from "zustand";
import {BLOCK_HEADER, RESOURCE_PRICE,L1_DA_MODE} from "@starknet-io/types-js";

export const dataBlockInit:BLOCK_HEADER={
    block_hash: "",
    parent_hash: "",
    block_number: 0,
    new_root: "",
    timestamp: 0,
    sequencer_address: "",
    l1_gas_price: {price_in_fri:"",price_in_wei:""},
    l2_gas_price: {price_in_fri:"",price_in_wei:""},
    l1_data_gas_price: {price_in_fri:"",price_in_wei:""},
    l1_da_mode: L1_DA_MODE.BLOB,
    starknet_version: "",
}

export interface BlockState {
    dataBlock: BLOCK_HEADER,
    setBlockData:(blockInfo:BLOCK_HEADER) =>void,
}

export const useStoreBlock = create<BlockState>()(set => ({
    dataBlock:dataBlockInit ,
    setBlockData:(dataBlock:BLOCK_HEADER)=>{set(state=>({dataBlock}))}
}));


