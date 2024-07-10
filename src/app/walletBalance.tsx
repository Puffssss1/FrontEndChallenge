"use client"
import { useEffect, useState } from "react";
import Web3 from 'web3';

export default function WalletBalance() {
    const [walletAdd, setWalletAdd] = useState("");
    const [balance, setBalance] = useState("");
    const [error, setError] = useState("");
   
    useEffect(() => {
      checkBalance();
    }, []);

    const checkBalance = async() =>{

      try {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        
          await window.ethereum.enable();
          const web3 = new Web3(window.ethereum);

          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          const userAddress = accounts[0];
  
          setWalletAdd(userAddress);
  
          const balanceWei = await web3.eth.getBalance(userAddress);

          const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
          setBalance(balanceEth);
        } else {
          setError('MetaMask or another Ethereum wallet provider not detected.');
        }
      } catch (err) {
        setError(`Error connecting or fetching balance: ${err.message}`);
      }
    };
  
  return(
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 p-4 py-6 text-center rounded-lg bg-customgrey text-customwhite">
        Check your balance here
        <div className="p-4 mt-4 text-center border rounded-lg border-customteal text-customwhite">
          {error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <>
              {walletAdd ? (
                <div>
                  <p className="mb-2">
                    Connected Wallet Address: {walletAdd.substring(0, 6)}...
                    {walletAdd.substring(38)}
                  </p>
                  <p className="text-customteal">
                    {balance !== null ? `Balance: ${balance} ETH` : 'Loading balance...'}
                  </p>
                </div>
              ) : (
                <p>Connecting to wallet...</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>

    )
}
