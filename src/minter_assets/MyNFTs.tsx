import React from "react"
import ToggleMenu from "./ToggleMenu";

export default function MyNFTs() {

  const loadNFTs = async () => {
    const plugClient = (window as any).ic.plug;
    const principal = await plugClient.getPrincipal();
    // const mintId = await minter.mint_principal(formImageURL, principal);
    // console.log("The id is " + Number(mintId));
    // setImageSrc(await minter.tokenURI(mintId));
  }

  return (
    <>
      <ToggleMenu />
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
          <div>
            {/*{data.map(function(d, idx){*/}
            {/*  return (<li key={idx}>{d.name}</li>)*/}
            {/*})}*/}
          </div>
        </div>
      </header>
    </>
  )
}
