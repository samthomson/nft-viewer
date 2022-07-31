
export const useNFTs = (address: string) => {
	const nfts = fetch(`https://deep-index.moralis.io/api/v2/${address}/nft?chain=polygon&format=decimal`)

	console.log('nfts', nfts)

	return undefined
}