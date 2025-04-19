import { usdc, tether, matic, solana, dai, ethereum1 } from "@/assets/icons";
import { Bitcoin } from "@/assets/icons";
import { StaticImageData } from "next/image";

interface Coin {
    id: number; 
    valueInput: string;
    image: StaticImageData;
    title: string;
    desc: string;
}

export const coin: Coin[] = [
    {
        id: 1,
        valueInput: 'ethereum',
        image: ethereum1,
        title: 'ETH',
        desc : 'Ethereum'
    },
    {
        id: 2,
        valueInput: 'admin',
        image: usdc,
        title: 'USDC',
        desc : 'USDC'
    },
    {
        id: 3,
        valueInput: 'moderator',
        image: Bitcoin,
        title: 'WBTC',
        desc : 'Wrapped...'
    },
    {
        id: 4,
        valueInput: 'developer',
        image: tether,
        title: 'USDT',
        desc : 'Tether USD'
    },
    {
        id: 5,
        valueInput: 'manager',
        image: matic,
        title: 'Matic',
        desc : 'Polygon'
    },
    {
        id: 6,
        valueInput: 'support',
        image: solana,
        title: 'Sol',
        desc : 'Solana'
    },
    {
        id: 7,
        valueInput: 'analyst',
        image: dai,
        title: 'DAI',
        desc : 'Dai Stabl...'
    }
]