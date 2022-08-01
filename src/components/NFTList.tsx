import { useCallback, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useMoralisWeb3Api } from "react-moralis"
import { useAccount } from 'wagmi'


type MoralisNFT = {
	name: string,
	token_id: string,
	contract_type: string,
	token_hash: string
}

const NFTList = () => {

	// todo: use current address once I can change address..
	const { address } = useAccount()
	const Web3Api = useMoralisWeb3Api();

	const getNFTsFromMoralis = async (chain: string): Promise<MoralisNFT[]> => {	
		const data = await Web3Api.account.getNFTs({
			address: '0x041eFEFac7a9A27836d3DF9439C10CFCFBCD8Ad5' as string,
			// @ts-ignore
			chain
		});
		console.log('data', data)
	
		return data?.result as unknown as MoralisNFT[] ?? []
	}

	const chain = "polygon"
	// todo: type response somehow
	const { isLoading, error, data: nfts } = useQuery(
		['nfts', chain], 
		() => getNFTsFromMoralis(chain),
		{
			enabled: !!address,
		}
	)


	if (isLoading) {
		return <>loading...</>
	}

   return <>
   	<h2>nfts</h2>
	{nfts.map(({name, token_id: tokenId, contract_type, token_hash}: MoralisNFT, key) => {
		// todo: show a pic
		return <div key={key}>
			<h5>{name}: {tokenId}</h5>
			<p>{token_hash} ({contract_type})</p>
		</div>
	})}
   </>
}

export default NFTList
