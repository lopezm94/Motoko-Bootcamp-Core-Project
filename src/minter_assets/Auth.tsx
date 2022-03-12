import React, { useEffect, useState } from "react"
import dfinityLogo from "./assets/dfinity.svg"

import { canisterId as minterCanisterId } from "canisters/minter";

// Note: This is just a basic example to get you started
export default function Auth() {

  const whitelist: string[] = [minterCanisterId];
  const host = "https://mainnet.dfinity.network";

  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [principal, setPrincipal] = useState<string>("");
  const [plugClient, setPlugClient] = useState<any>((window as any).ic.plug);

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
  }, [])

  return (
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
  )
}
