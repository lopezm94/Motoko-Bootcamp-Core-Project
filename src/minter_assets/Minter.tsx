import React, {FormEvent, useEffect, useState} from "react"
import ToggleMenu from "./ToggleMenu";

import dfinityLogo from "./assets/dfinity.svg"

import { canisterId as minterCanisterId, idlFactory as minterIdlFactory } from "canisters/minter";

export default function Minter() {
    const [plugClient, setPlugClient] = useState<any>((window as any).ic.plug);
    const [imageSrc, setImageSrc] = useState<any>(dfinityLogo);
    const [formImageURL, setFormImageURL] = useState<string>("");
    const [mintId, setMintId] = useState<number | null>(null);
    const [isMinting, setMintingFlag] = useState<boolean>(false);
    const [isFailed, setFailedFlag] = useState<boolean>(false);

    useEffect(() => {
    }, []);

    const mintNFT = async () => {
        const minter = await plugClient.createActor({
            canisterId: minterCanisterId,
            interfaceFactory: minterIdlFactory,
        });
        setFailedFlag(false);
        setMintingFlag(true);
        try {
            const mintId = await minter.mint(formImageURL);
            console.log("The id is " + Number(mintId));
            setImageSrc(await minter.tokenURI(mintId));
            setMintId(Number(mintId));
        } catch(e) {
            setImageSrc(dfinityLogo);
            setFailedFlag(true);
        } finally {
            setMintingFlag(false);
        }
    };

    const onMintClick = async () => {
        await mintNFT();
    };

    return (
      <>
        <ToggleMenu/>
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
              {!isMinting ? (
                  <div>
                  <form action="#">
                      <label htmlFor="name">Enter a tokenURI: &nbsp;</label>
                      <input id="image_url" type="text" value={formImageURL} onInput={(evt: FormEvent<any>) => setFormImageURL(evt.currentTarget.value)}/>
                  </form>
                  <div>
                      <button id="mint" type="submit" onClick={onMintClick}>Mint</button>
                  </div>
                  {!isFailed && mintId != null ? (
                      <div>Minted token id: {mintId}</div>
                  ) : null}
                  </div>
              ) : null}
              {isMinting ? (
                  <div>Minting...</div>
              ) : null}
              {isFailed ? (
                  <div>Error minting NFT, log in or try again</div>
              ) : null}
          </div>
        </header>
      </>
    );
}
