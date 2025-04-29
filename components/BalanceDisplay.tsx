"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { FaMoneyCheckDollar } from "react-icons/fa6";

const BalanceDisplay = () => {
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!connection || !publicKey) return;

    const fetchBalance = async () => {
      try {
        const info = await connection.getAccountInfo(publicKey);
        if (info) {
          setBalance(info.lamports);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
    const intervalId = setInterval(fetchBalance, 10000);

    return () => clearInterval(intervalId);
  }, [connection, publicKey]);

  return (
    <div className="flex items-center space-x-2">
      <div className="bg-white bg-opacity-20 p-1 rounded-full">
        {/* <img src="/api/placeholder/24/24" alt="SOL" className="h-6 w-6 rounded-full" /> */}
        <FaMoneyCheckDollar />
      </div>
      <p className="text-white font-medium">
        {publicKey
          ? `${(balance / LAMPORTS_PER_SOL).toFixed(4)} SOL`
          : "Connect Wallet"}
      </p>
    </div>
  );
};

export default BalanceDisplay;
