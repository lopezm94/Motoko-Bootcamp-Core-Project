import React from "react"
import {Link} from "react-router-dom";

export default function Wallet() {
  return (
    <>
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
