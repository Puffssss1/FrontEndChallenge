"use client"
import { useEffect, useState } from "react";

export default function ConnectButton() {
    const [walletAdd, setWalletAdd] = useState ("");

    useEffect(() => {
        connectedWallet();
    })

    const connectWallet = async() =>{
        if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
          try {
            /*installed*/
            const account = await window.ethereum.request({method: "eth_requestAccounts"});
            setWalletAdd(account[0]);
            console.log(account[0]);
          } catch(err) {
            console.error(err.message);
          }
        } else {
          /*not isntalled */
          console.log("please install metamask libraries");
        }
      }

      const connectedWallet = async() =>{
        if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
          try {
            const account = await window.ethereum.request({method: "eth_accounts"});
                if(account.length > 0) {
                    setWalletAdd(account[0]);
                    console.log(account[0]);
                } else {
                    console.log("Connect your Metamask Wallet");
                  }
          } catch(err) {
            console.error(err.message);
          }
        } else {
          /*not isntalled */
          console.log("please install metamask libraries");
        }
      }

    return(
        <div className="fixed top-4 right-4">
            <button  onClick={connectWallet} className="p-5 bg-customgrey text-customfont rounded-lg">
                <span className="">
                    {walletAdd.length > 0 ?
                    `Connected: ${walletAdd.substring(0, 6)}...${walletAdd.substring(38)}`
                    : "Connect Wallet"}
                </span>
            </button> 
        </div>
    )
    
  
}
