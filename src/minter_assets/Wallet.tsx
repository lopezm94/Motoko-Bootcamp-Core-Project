import React from "react"

export default function Wallet() {
  return (
    <>
      <header className="wallet-header">
        <p style={{ fontSize: "2em", marginBottom: "0.5em" }}>Wallet Page</p>
        <div style={{
          display: "flex",
          fontSize: "0.7em",
          textAlign: "left",
          padding: "2em",
          borderRadius: "30px",
          flexDirection: "column",
          background: "rgb(220 218 224 / 25%)",
        }}>
          <iframe src="https://bootcamp-faucet.vercel.app/"></iframe>
        </div>
      </header>
    </>
  )
}
