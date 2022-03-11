import React, {useEffect, useState} from "react"
import ToggleMenu from "./ToggleMenu";

import dfinityLogo from "./assets/dfinity.svg"

import { minter } from "canisters/minter"

export default function Minter() {
    const [imageURL, setImageURL] = useState<string>("");
    const [plugClient, setPlugClient] = useState<any>((window as any).ic.plug);

    useEffect(() => {
    }, [])

    const mintNFT = async () => {
        const imageURL = "";
        const plugClient: any = {};
        console.log("The url we are trying to mint is " + imageURL);
        const principal = await plugClient.getPrincipal();
        const mintId = await minter.mint_principal(imageURL, principal);
        console.log("The id is " + Number(mintId));

        // document.getElementById("nft").src = await minter.tokenURI(mintId);
        //
        // // Show some information about the minted image.
        // document.getElementById("greeting").innerText = "this nft owner is " + principal_string + "\nthis token id is " + Number(mintId);
    }

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
            <img id="nft" src={dfinityLogo} alt="bootcamp_logo"/>
            <form action="#">
                <label htmlFor="name">Enter a tokenURI: &nbsp;</label>
                {/*<input id="image_url" type="text" value={imageURL} onInput={(evt: FormEvent<any>) => setImageURL(evt.currentTarget.value)}/>*/}
            </form>
            <div>
                <button id="mint" type="submit">Mint</button>
            </div>
          </div>
        </header>
      </>
    );
}
