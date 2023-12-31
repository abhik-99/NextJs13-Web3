import { configureChains } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { polygonMumbai } from 'viem/chains'
import { createConfig } from 'wagmi'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()],
)
// alchemyProvider({ apiKey: process.env.ALCHEMY_API })
export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})