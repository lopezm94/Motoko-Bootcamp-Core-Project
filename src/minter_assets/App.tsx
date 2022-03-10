import React from "react"
import { Auth } from "./Auth"
import { Intro } from "./Intro"
import {ToggleMenu} from "./ToggleMenu";

function App() {
  return (
    <div className="App">
      <ToggleMenu />
      <Auth />
      <Intro />
    </div>
  )
}

export default App
