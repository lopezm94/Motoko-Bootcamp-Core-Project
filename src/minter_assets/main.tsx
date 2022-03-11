import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import Minter from "./Minter";
import Wallet from "./Wallet";
import MyNFTs from "./MyNFTs";

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Routes>
                <Route path='/' element={<App />}/>
                <Route path='/wallet' element={<Wallet />} />
                <Route path='/minter' element={<Minter />} />
                <Route path='/my-nfts' element={<MyNFTs />} />
            </Routes>
        </React.StrictMode>
    </BrowserRouter>,
  document.getElementById("root"),
)
