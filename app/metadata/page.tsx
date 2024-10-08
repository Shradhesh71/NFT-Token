"use client";

import { useState, useCallback } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { AiOutlineClose } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import InputView from "@/components/inputView";
import Navbar from "@/components/Navbar";
import Branding from "@/components/Branding";
import "./globals.css";

export default function TokenMetadata() {
  const { connection } = useConnection();
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenMetadata, setTokenMetadata] = useState(null);
  const [logo, setLogo] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getMetadata = useCallback(
    async (form: any) => {
      setIsLoading(true);

      try {
        const tokenMint = new PublicKey(form);
        const metadataPDA = PublicKey.findProgramAddressSync(
          [
            Buffer.from("metadata"),
            PROGRAM_ID.toBuffer(),
            tokenMint.toBuffer(),
          ],
          PROGRAM_ID
        )[0];

        const metadataAccount = await connection.getAccountInfo(metadataPDA);
        const [metadata, _] = await Metadata.deserialize(metadataAccount!.data);

        let logoRes = await fetch(metadata.data.uri);
        let logoJson = await logoRes.json();
        let { image } = logoJson;

        //   @ts-ignore
        setTokenMetadata({ tokenMetadata, ...metadata.data });
        setLogo(image);
        setLoaded(true);
        setIsLoading(false);
        setTokenAddress("");
        console.log({
          type: "success",
          message: "Token metadata fetched successfully!",
        });
      } catch (error) {
        console.log({
          type: "error",
          message: "Token metadata fetched fail!, error: " + error,
        });
        setIsLoading(false);
      }
    },
    [tokenAddress]
  );

  return (
    <div className="bg-indigo-950">
      <Navbar />
      {isLoading && (
        <div className="absolute top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black/[.3] backdrop-blur-[10px]">
          <ClipLoader />
        </div>
      )}

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
              {!loaded ? (
                <div className="lg:ps-0  flex h-full flex-col p-10">
                  <div className=" pb-10">
                    <a className="flex">
                      <img src="image.png" alt="SOLANA" className="h-10" />
                    </a>
                  </div>

                  <div className="my-auto pb-6 text-center">
                    {" "}
                    <h4 className=" font-bold mb-4 text-2xl text-white">
                      Link to your new token
                    </h4>
                    <p className="text-default-300 mx-auto mb-5 max-w-sm text-white/70">
                      Your Solana Token Successfully created, Check now explorer
                    </p>
                    <div className="flex items-start justify-center">
                      <img
                        src={"assets/images/logout.svg"}
                        alt="logout Image"
                        className="h-40"
                      />
                    </div>
                    <div className="mt-5 w-full text-center">
                      {" "}
                      <p className="text-default-300 text-base font-medium leading-6"></p>
                      <InputView
                        name={"Token Address"}
                        placeholder={"address"}
                        clickhandle={(e) => setTokenAddress(e.target.value)}
                      />
                      <div className="mb-6 text-center">
                        <button
                          onClick={() => getMetadata(tokenAddress)}
                          className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-wrap backdrop-blur-2xl transition-all duration-500"
                        >
                          <span className="fw-cold"> Get Token Metadata</span>
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
              ) : (
                <div className="lg:ps-0  flex h-full flex-col p-10">
                  <div className=" pb-10">
                    <a className="flex">
                      <img src="image.png" alt="SOLANA" className="h-10" />
                    </a>
                  </div>

                  <div className="my-auto pb-6 text-center">
                    {" "}
                    <h4 className=" font-bold mb-4 text-2xl text-white">
                      Link to your new token
                    </h4>
                    <p className="text-default-300 mx-auto mb-5 max-w-sm">
                      Your Solana Token Successfully created, Check now explorer
                    </p>
                    <div className="flex items-start justify-center">
                      <img src={logo!} alt="token Image" className="h-40" />
                    </div>
                    <div className="mt-5 w-full text-center">
                      {" "}
                      <p className="text-default-300 text-base font-medium leading-6"></p>
                      <InputView
                        name={"Token Address"}
                        // @ts-ignore
                        placeholder={tokenMetadata?.name}
                        clickhandle={(e) => null}
                      />
                      <InputView
                        name={"Symbol"}
                        // @ts-ignore
                        placeholder={tokenMetadata?.symbol || "undefiend"}
                        clickhandle={(e) => null}
                      />
                      <InputView
                        name={"Token URI"}
                        // @ts-ignore
                        placeholder={tokenMetadata?.uri}
                        clickhandle={(e) => null}
                      />
                      <div className="mb-6 text-center">
                        <a
                          // @ts-ignore
                          href={tokenMetadata?.uri}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500"
                        >
                          <span className="fw-bold"> Open URI</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
