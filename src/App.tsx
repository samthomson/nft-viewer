import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MoralisProvider } from "react-moralis";

import Profile from './components/Profile'
import NFTList from './components/NFTList'

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})
 

const queryClient = new QueryClient()

const App = () =>  {
  return (
    <WagmiConfig client={client}>
      <MoralisProvider serverUrl="https://juqmgt9rllwq.usemoralis.com:2053/server" appId="ioWjLrMz1e51WZllA4FK4o6lrUADHDAxNXqXT9km">
        <QueryClientProvider client={queryClient}>
          <Profile />
          <hr />
          <NFTList />
        </QueryClientProvider>    
      </MoralisProvider>
    </WagmiConfig>
  )
}

export default App
