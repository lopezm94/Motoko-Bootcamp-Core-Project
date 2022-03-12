import React, {FormEvent, useEffect, useState} from "react"

import dfinityLogo from "./assets/dfinity.svg"

import faucetIdlFactory from "./idl/faucet.did";

import { canisterId as minterCanisterId, idlFactory as minterIdlFactory } from "canisters/minter";
import {Link} from "react-router-dom";

export default function Minter() {
    const [plugClient, setPlugClient] = useState<any>((window as any).ic.plug);
    const [imageSrc, setImageSrc] = useState<any>(dfinityLogo);
    const [formImageURL, setFormImageURL] = useState<string>("");
    const [mintId, setMintId] = useState<number | null>(null);
    const [isMinting, setMintingFlag] = useState<boolean>(false);
    const [isSending, setSendingFlag] = useState<boolean>(false);
    const [isMintFailed, setMintFailedFlag] = useState<boolean>(false);
    const [isSendFailed, setSendFailedFlag] = useState<boolean>(false);
    const [signedIn, setSignedIn] = useState<boolean>(false);
    const [principal, setPrincipal] = useState<string>("");

    const faucetCanisterId = "yeeiw-3qaaa-aaaah-qcvmq-cai";
    const whitelist: string[] = [faucetCanisterId, minterCanisterId];
    const host = "https://mainnet.dfinity.network";

    const verifyPlugInterface = async () => {
        if (!plugClient) {
            const windowAsAny: any = window;
            const windowIC = await windowAsAny.ic;
            setPlugClient(windowIC.plug);
        }
    }

    const signIn = async() => {
        await plugClient.requestConnect({ whitelist, host });
        await plugClient.createAgent({ whitelist, host });
        await plugClient.agent.fetchRootKey();
        const principal = await plugClient.getPrincipal();
        setPrincipal(principal.toString());
        setSignedIn(true);
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
    }, []);

    const sendTokens = async () => {
        const faucet = await plugClient.createActor({
            canisterId: faucetCanisterId,
            interfaceFactory: faucetIdlFactory,
        });
        setSendFailedFlag(false);
        setSendingFlag(true);
        try {
            const sendArgs = {
                to: "9b2103cf4880961d85734da9e9470629aa24d208fc7951da8d2c28996796696a",
                fee: {e8s: 10000},
                memo: 0,
                from_subaccount: [],
                created_at_time: [],
                amount: {e8s: 10000000000},
            };
            await faucet.send_dfx(sendArgs);
            console.log("Successful send");
        } catch(e) {
            setSendFailedFlag(true);
        } finally {
            setSendingFlag(false);
        }
    };

    const mintNFT = async () => {
        const minter = await plugClient.createActor({
            canisterId: minterCanisterId,
            interfaceFactory: minterIdlFactory,
        });
        setMintFailedFlag(false);
        setMintingFlag(true);
        try {
            const mintId = await minter.mint(formImageURL);
            console.log("The id is " + Number(mintId));
            setImageSrc(await minter.tokenURI(mintId));
            setMintId(Number(mintId));
        } catch(e) {
            setImageSrc(dfinityLogo);
            setMintFailedFlag(true);
        } finally {
            setMintingFlag(false);
        }
    };

    const onMintClick = async () => {
        await sendTokens();
        await mintNFT();
    };

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
        <header className="minter-header">
          <p style={{fontSize: "2em", marginBottom: "0.5em"}}>Minter Page</p>
          <div style={{
            display: "flex",
            fontSize: "0.7em",
            textAlign: "left",
            padding: "2em",
            borderRadius: "30px",
            flexDirection: "column",
            background: "rgb(220 218 224 / 25%)",
          }}>
            <img id="nft" src={imageSrc} alt="bootcamp_logo"/>
              {!signedIn ? (
                  <div>Must be signed In</div>
              ) : null}
              {signedIn && !isSending && !isMinting ? (
                  <div>
                  <form action="#">
                      <label htmlFor="name">Enter a tokenURI: &nbsp;</label>
                      <input id="image_url" type="text" value={formImageURL} onInput={(evt: FormEvent<any>) => setFormImageURL(evt.currentTarget.value)}/>
                  </form>
                  <div>
                      <button id="mint" type="submit" onClick={onMintClick}>Mint</button>
                  </div>
                  {!isMintFailed && mintId != null ? (
                      <div>Minted token id: {mintId}</div>
                  ) : null}
                  </div>
              ) : null}
              {signedIn && isSending ? (
                  <div>Sending...</div>
              ) : null}
              {signedIn && !isSending && isMinting ? (
                  <div>Minting...</div>
              ) : null}
              {signedIn && !isSendFailed && isMintFailed ? (
                  <div>Error minting NFT, log in or try again</div>
              ) : null}
              {signedIn && isSendFailed ? (
                  <div>Error sending payment, try again</div>
              ) : null}
          </div>
        </header>
      </>
    );
}
