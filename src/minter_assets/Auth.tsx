import React, { useEffect, useState } from "react"
import dfinityLogo from "./assets/dfinity.svg"

// Note: This is just a basic example to get you started
function Auth() {

  const whitelist: string[] = [];
  const host = (import.meta.env["DFX_NETWORK"] == "ic") ? "https://mainnet.dfinity.network" : "localhost:8000";

  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [publicKey, setPublicKey] = useState<string>("");
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
    const publicKey = await plugClient.requestConnect({ whitelist, host });
    setPublicKey(publicKey);
    const principal = await plugClient.getPrincipal();
    setPrincipal(principal.toString());
    setSignedIn(true);
  }

  const verifySignedIn = async () => {
    const connected = await plugClient.isConnected();
    if (!connected) {
      setSignedIn(false);
      await signIn();
    }
  }

  useEffect(() => {
    verifyPlugInterface().then((_) => {
      verifySignedIn();
    });
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

export { Auth }
