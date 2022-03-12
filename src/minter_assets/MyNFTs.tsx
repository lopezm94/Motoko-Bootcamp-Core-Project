import React, {useEffect, useState} from "react"

import { canisterId as minterCanisterId, idlFactory as minterIdlFactory } from "canisters/minter";
import dfinityLogo from "./assets/dfinity.svg";
import {Link} from "react-router-dom";

export default function MyNFTs() {
  const [plugClient, setPlugClient] = useState<any>((window as any).ic.plug);
  const [nftEntries, setNFTEntries] = useState<any[]>([]);
  const [isFailed, setFailedFlag] = useState<boolean>(false);
  const [isLoading, setLoadingFlag] = useState<boolean>(false);
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [principal, setPrincipal] = useState<string>("");

  const whitelist: string[] = [minterCanisterId];
  const host = "https://mainnet.dfinity.network";

  const verifyPlugInterface = async () => {
    if (!plugClient) {
      const windowAsAny: any = window;
      const windowIC = await windowAsAny.ic;
      setPlugClient(windowIC.plug);
    }
  }

  const loadNFTEntries = async () => {
    const minter = await plugClient.createActor({
      canisterId: minterCanisterId,
      interfaceFactory: minterIdlFactory,
    });
    try {
      setFailedFlag(false);
      setLoadingFlag(true);
      let data = await minter.getMyTokens();
      setNFTEntries(data.map((x: any) => {
        return {
          id: Number(x[0]),
          url: x[1]
        }
      }));
    } catch(e) {
      setFailedFlag(true);
    } finally {
      setLoadingFlag(false);
    }
  };

  const signIn = async() => {
    await plugClient.requestConnect({ whitelist, host });
    await plugClient.createAgent({ whitelist, host });
    await plugClient.agent.fetchRootKey();
    const principal = await plugClient.getPrincipal();
    setPrincipal(principal.toString());
    setSignedIn(true);
    await loadNFTEntries();
  }

  const verifySignedIn = async () => {
    await verifyPlugInterface();
    const connected = await plugClient.isConnected();
    if (!connected) {
      setSignedIn(false);
      await signIn();
    }
  }

  useEffect(() => {
    verifySignedIn();
  }, [])

  return (
    <>
      <div className="menu-toggle-header">
        <div className="auth-section">
          {!signedIn && plugClient ? (
              <button onClick={signIn} className="auth-button">
                Sign in
                <img style={{ width: "33px", marginRight: "-1em", marginLeft: "0.7em" }} src={dfinityLogo} />
              </button>
          ) : null}

          {signedIn ? (
              <>
                <p>Signed in as: {principal}</p>
                <div className="auth-button">
                  <img style={{ width: "33px", marginRight: "-1em", marginLeft: "0.7em" }} src={dfinityLogo} />
                </div>
              </>
          ) : null}
        </div>
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
        <p style={{ fontSize: "2em", marginBottom: "0.5em" }}>My NFTs Page</p>
        <div style={{
          display: "flex",
          fontSize: "0.7em",
          textAlign: "left",
          padding: "2em",
          borderRadius: "30px",
          flexDirection: "column",
          background: "rgb(220 218 224 / 25%)",
        }}>
          {!isLoading && signedIn && !isFailed ? (
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
          {!isLoading && signedIn && isFailed ? (
              <div>Loading failed</div>
          ) : null}
          {isLoading && signedIn ? (
              <div>Loading...</div>
          ) : null}
          {!isLoading && !signedIn ? (
              <div>Must be signed In</div>
          ) : null}
        </div>
      </header>
    </>
  )
}
