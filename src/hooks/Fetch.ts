import * as React from 'react';
import { useState, useEffect } from 'react';

import { ApiCalls } from '../api'; 

export interface ShopState {
    id: string,
    name: string,
    image: string,
    description: string,
    price: string,
    prod_id: string,
    quantity: number,
    order_id?: string
}

interface UseGetShopData {
    shopData: ShopState[]
    getData: () => void 
}

export const useGetShop = (): UseGetShopData => {
    const [shopData, setData] = useState<ShopState[]>([])
    async function handleDataFetch(){
        const result = await ApiCalls.getShop()
        console.log(result)
        setData(result)
    }

    useEffect( () => {
        handleDataFetch()
    }, [])
    return { shopData, getData: handleDataFetch }
}

interface UseGetOrderData {
    orderData: ShopState[]
    getData: () => void 
}

export const useGetOrder = (): UseGetOrderData => {
    const [orderData, setData] = useState<ShopState[]>([])

    async function handleDataFetch(){
        const result = await ApiCalls.getOrder() //this is making our api call
        console.log(result)
        setData(result)
    }

    useEffect( () => {
        handleDataFetch()
    }, [])
    return { orderData, getData: handleDataFetch }
}