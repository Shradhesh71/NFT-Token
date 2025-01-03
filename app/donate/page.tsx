"use client";

import BalanceDisplay from "@/components/BalanceDisplay";
import Branding from "@/components/Branding";
import Navbar from "@/components/Navbar";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  TransactionSignature,
  PublicKey,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import { useCallback, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../../styles/globals.css";
import InputView from "@/components/inputView";
import Footer from "@/components/Footer";

export default function Donate() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [amount, setAmount] = useState("0.0");

  const onClick = useCallback(async () => {
    if (!publicKey) {
      console.log({
        type: "error",
        message: "Please connect your wallet first",
      });
      return;
    }

    const creatorAddress = new PublicKey(
      "6jNwuRLxJjWcaLCJM3iFCNYiH7pVpc4NYjEutkwzzGHW"
    );
    console.log(publicKey);
    let signature: TransactionSignature = "";
    try {
      const transition = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: creatorAddress,
          lamports: LAMPORTS_PER_SOL * Number(amount),
        })
      );

      signature = await sendTransaction(transition, connection);
      console.log({
        type: "Success",
        message: "Donation successfully received, fund amount: " + amount,
        txid: signature,
      });

      return;
    } catch (error: any) {
      console.log({
        type: "error",
        txid: signature,
        message: "Donation failed, error: " + error.message,
      });
    }
  }, [publicKey, amount, connection, sendTransaction]);

  return (
    <div className="bg-indigo-950">
      <Navbar />

      <section className="flex w-full items-center py-6 px-0 lg:h-screen lg:p-10">
        <div className=" container">
          <div className="bg-default-950/40 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl">
            <div className="grid gap-10 lg:grid-cols-2">
              {/* First */}
              <Branding
                image="auth-img"
                title="To Build your solana token Creator"
                message="Try and create you first ever solana project"
              />
              {/* second */}

              <div className="lg:ps-0  flex h-full flex-col p-10">
                <div className=" pb-10">
                  <a className="flex">
                    <img src="image.png" alt="SOLANA" className="h-10" />
                  </a>
                </div>

                <div className="my-auto pb-6 text-center">
                  {" "}
                  <h4 className=" font-bold mb-4 text-2xl text-white">
                    {wallet && (
                      <p>
                        <BalanceDisplay />
                      </p>
                    )}
                  </h4>
                  <p className="text-default-300 mx-auto mb-5 max-w-sm text-white/70">
                    Now you can Donate, to the create token in our platfrom
                  </p>
                  <div className=" flex items-start justify-center">
                    <img
                      src="assets/images/logout.svg"
                      alt="logout"
                      className="h-40"
                    />
                  </div>
                  <div className=" text-start">
                    <InputView
                      name="Amount"
                      placeholder="amount"
                      clickhandle={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      onClick={onClick}
                      disabled={!publicKey}
                      className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-wrap backdrop-blur-2xl transition-all duration-500"
                    >
                      <span className="fw-cold">Donate </span>
                    </button>
                  </div>
                  <div className="">
                    <div className=" text-center">
                      <ul className="flex flex-wrap items-center justify-center gap-2">
                        {" "}
                        <li>
                          <a
                            href="/"
                            className=" group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all hover:bg-blue-600/6 "
                          >
                            <i className="text-2xl text-white group-hover:text-white">
                              <AiOutlineClose />{" "}
                            </i>
                          </a>
                        </li>{" "}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
