import React, { useEffect, useState } from "react"
import {Link} from "react-router-dom";

import { minter, canisterId } from "canisters/minter";

export default function Intro() {
  const [plugClient, setPlugClient] = useState<any>((window as any).ic.plug);
  const [nftEntries, setNFTEntries] = useState<any[]>([]);
  const [isFailed, setFailedFlag] = useState<boolean>(false);
  const [isLoading, setLoadingFlag] = useState<boolean>(false);

  const verifyPlugInterface = async () => {
    if (!plugClient) {
      const windowAsAny: any = window;
      const windowIC = await windowAsAny.ic;
      setPlugClient(windowIC.plug);
    }
  }

  const loadNFTEntries = async () => {
    try {
      console.log("Hola");
      console.log(canisterId);
      const host = "https://mainnet.dfinity.network";
      console.log(host);
      setFailedFlag(false);
      setLoadingFlag(true);
      let data = await minter.getRangeOfTokensStartingFromLast(BigInt(0), BigInt(50));
      setNFTEntries(data.map((x: any) => {
        return {
          id: Number(x[0]),
          url: x[1]
        }
      }));
      console.log("Chao");
    } catch(e) {
      console.log(e);
      setFailedFlag(true);
    } finally {
      setLoadingFlag(false);
    }
  };

  const verifyLoadedNFTs = async () => {
    await verifyPlugInterface();
    if (isFailed) return;
    const loaded = nftEntries.length > 0;
    if (!loaded) {
      await loadNFTEntries();
    }
  }

  useEffect(() => {
    verifyLoadedNFTs();
  }, [])

  verifyLoadedNFTs();

  return (
      <>
        <div className="menu-toggle-header">
          <div>
            <h2>Menu</h2>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link">Home</Link></li>
              </ul>
            </nav>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/wallet'} className="nav-link">Wallet</Link></li>
              </ul>
            </nav>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/minter'} className="nav-link">Minter</Link></li>
              </ul>
            </nav>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/my-nfts'} className="nav-link">MyNFTs</Link></li>
              </ul>
            </nav>
            <hr />
          </div>
        </div>
        <header className="my-nfts-header">
          <p style={{ fontSize: "2em", marginBottom: "0.5em" }}>Mint History</p>
          <div style={{
            display: "flex",
            fontSize: "0.7em",
            textAlign: "left",
            padding: "2em",
            borderRadius: "30px",
            flexDirection: "column",
            background: "rgb(220 218 224 / 25%)",
          }}>
            {!isLoading && !isFailed ? (
                <div>
                  {nftEntries.map(function(x){
                    return (
                        <div>
                          <div>Token Id: {x.id}</div>
                          <img id={"nft-"+x.id} src={x.url} alt={"nft-"+x.id}/>
                        </div>
                    )
                  })}
                </div>
            ) : null}
            {!isLoading && isFailed ? (
                <div>Loading failed</div>
            ) : null}
            {isLoading ? (
                <div>Loading...</div>
            ) : null}
          </div>
        </header>
      </>
  );
}
