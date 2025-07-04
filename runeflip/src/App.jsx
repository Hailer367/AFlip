import React, { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  BackpackWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "./styles/app.css";

const network = "devnet";
const endpoint = clusterApiUrl(network);
const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new BackpackWalletAdapter()];

const App = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("termsAccepted") === "true";
    setTermsAccepted(accepted);
  }, []);

  const acceptTerms = () => {
    localStorage.setItem("termsAccepted", "true");
    setTermsAccepted(true);
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <div className="app-container">
          {!termsAccepted ? (
            <div className="terms-modal">
              <h2>RuneFlip Terms & Conditions</h2>
              <p>You must be 18+ and accept the terms to use this app.</p>
              <button onClick={acceptTerms}>I am 18+ and Accept</button>
            </div>
          ) : (
            <>
              <div className="wallet-bar">
                <WalletMultiButton />
              </div>
              <main>
                <h1>🧿 RuneFlip</h1>
                <p>Connect your wallet to start flipping!</p>
              </main>
            </>
          )}
        </div>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
// Placeholder for App.jsx
