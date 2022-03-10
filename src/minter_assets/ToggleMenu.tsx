import React, {PureComponent, RefObject, createRef} from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import {Auth} from "./Auth";

export function ToggleMenu () {

    return (
        <div className="menu-toggle-header">
            <Auth />
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
    );

}
