"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function BalanceDisplay() {
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!connection || !publicKey) return;

    connection.getAccountInfo(publicKey).then((info: any) => {
      setBalance(info.lamports);
      // console.log("info: ", info);
    });
  }, [connection, publicKey]);

  return (
    <div>
      <p>{publicKey ? `SOL Balance: ${balance / LAMPORTS_PER_SOL}` : ""}</p>
    </div>
  );
}
