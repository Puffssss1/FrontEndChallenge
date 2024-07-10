import Image from "next/image";
import ConnectButton from "./connectButton";
import WalletBalance from "./walletBalance";


export default function Home() {
  

  return (
    <>
      <ConnectButton />
      <WalletBalance />
    </>
  );
}
