import React from "react"
import ToggleMenu from "./ToggleMenu";

export default function MyNFTs() {
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
        </div>
      </header>
    </>
  )
}
