"use client";

import Navbar from "@/components/Navbar";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptAccount,
  getAssociatedTokenAddress,
  createMintToInstruction,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import {
  PROGRAM_ID,
  createCreateMetadataAccountInstruction,
  createCreateMetadataAccountV3Instruction,
} from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { AiOutlineClose } from "react-icons/ai";
import { useCallback, useState } from "react";
import CreateSVG from "@/components/svg/CreateSVG";
import "./globals.css";
import InputView from "@/components/inputView";
import Branding from "@/components/Branding";

export default function CreateToken() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [tokenUri, setTokenUri] = useState("");
  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState({
    name: "",
    symlink: "",
    decimals: "",
    amount: "",
    image: "",
    description: "",
  });

  const handleChange = (fieldName: any, e: any) => {
    setToken({ ...token, [fieldName]: e.target.value });
  };

  //   create token function
  // 1. create metadata
  // 2. upload image
  // 3. create token

  const createToken = useCallback(
    async (token: any) => {
      const lamports = await getMinimumBalanceForRentExemptAccount(connection);
      const mintKeypair = Keypair.generate();
      const tokenATA = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        publicKey!
      );

      try {
        const metadatUrl = await uploadMetadata(token);
        console.log(metadatUrl);

        const createMetadataInstruction =
          createCreateMetadataAccountV3Instruction(
            {
              metadata: PublicKey.findProgramAddressSync(
                [
                  Buffer.from("metadata"),
                  PROGRAM_ID.toBuffer(),
                  mintKeypair.publicKey.toBuffer(),
                ],
                PROGRAM_ID
              )[0],
              mint: mintKeypair.publicKey,
              mintAuthority: publicKey!,
              payer: publicKey!,
              updateAuthority: publicKey!,
            },
            {
              createMetadataAccountArgsV3: {
                data: {
                  name: token.name,
                  symbol: token.symbol,
                  uri: metadatUrl!,
                  creators: null,
                  sellerFeeBasisPoints: 0,
                  uses: null,
                  collection: null,
                },
                isMutable: false,
                collectionDetails: null,
              },
            }
          );

        const createNewTokenTransaction = new Transaction().add(
          SystemProgram.createAccount({
            fromPubkey: publicKey!,
            newAccountPubkey: mintKeypair.publicKey,
            space: MINT_SIZE,
            lamports: lamports,
            programId: TOKEN_PROGRAM_ID,
          }),
          createInitializeMintInstruction(
            mintKeypair.publicKey,
            Number(token.decimals),
            publicKey!,
            publicKey!,
            TOKEN_PROGRAM_ID
          ),

          createAssociatedTokenAccountInstruction(
            publicKey!,
            tokenATA,
            publicKey!,
            mintKeypair.publicKey
          ),
          createMintToInstruction(
            mintKeypair.publicKey,
            tokenATA,
            publicKey!,
            Number(token.amount) * Math.pow(10, Number(token.decimals))
          ),
          createMetadataInstruction
        );

        const signature = await sendTransaction(
          createNewTokenTransaction,
          connection,
          { signers: [mintKeypair] }
        );

        setTokenMintAddress(mintKeypair.publicKey.toString());
        console.log({
          type: "success",
          message: "Token created successfully",
          txid: signature,
        });
      } catch (error: any) {
        console.log(error);
      }
      setIsLoading(false);
    },
    [publicKey, connection, sendTransaction]
  );

  //   IMAGE upload IPFS
  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const imgUrl = await uploadImagePinata(file);
      setToken({ ...token, image: imgUrl! });
    }
    console.log("Done handleImageChange ✅");
  };

  const uploadImagePinata = async (file: any) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          method: "POST",
          data: formData,
          headers: {
            pinata_api_key: process.env.PINATA_API_KEY,
            pinata_secret_api_key:
              process.env.PINATA_SECRET_API_KEY,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash =
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash;
        return ImgHash;
      } catch (error) {
        console.log("uploadImagePinata error: ", error);
      }
    }
    setIsLoading(false);
  };

  //   METADATA
  const uploadMetadata = async (token: any) => {
    setIsLoading(true);
    const { name, symbol, image, description } = token;

    if (!name || !symbol || !image || !description) {
      return console.log("Please fill all fields");
    }

    const data = JSON.stringify({
      name: name,
      symbol: symbol,
      image: image,
      description: description,
    });

    try {
      const response = await axios({
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        method: "POST",
        data: data,
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
          "Content-Type": "application/json",
        },
      });

      const url = "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash;
      return url;
    } catch (error) {
      console.log("uploadMetadata error: ", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-indigo-950">
      <Navbar />
      {isLoading && (
        <div className="absolute top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black/[.3] backdrop-blur-[10px]">
          <ClipLoader />
        </div>
      )}

      {!tokenMintAddress ? (
        <section className="flex w-full items-center py-6 px-0 lg:h-screen lg:p-10">
          <div className=" container">
            <div className="bg-default-950/40 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl">
              <div className="grid gap-10 lg:grid-cols-2">
                <div className="ps-4 hidden py-4 pt-10 lg:block">
                  <div className=" upload relative w-full overflow-hidden rounded-xl">
                    {token.image ? (
                      <img
                        src={token.image}
                        alt="token image"
                        className="w-2/5"
                      />
                    ) : (
                      <label htmlFor="file" className="custum-file-upload">
                        <div className="icon">
                          {" "}
                          <CreateSVG />{" "}
                        </div>
                        <div className="text">
                          {" "}
                          <span>Click to upload image</span>
                        </div>
                        <input
                          type="file"
                          id="file"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>

                  <textarea
                    rows={6}
                    onChange={(e) => handleChange("description", e)}
                    className="border-default-200 relative mt-48 block w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent"
                    placeholder="Description of your token"
                  ></textarea>
                </div>
                <div className="lg:ps-0 flex flex-col p-10">
                  <div className="pb-6 my-auto">
                    <h4 className="mb-4 text-2xl font-bold text-white">
                      Solana Token Creator
                    </h4>
                    <p className="text-default-300 mb-8 max-w-sm">
                      Kindly provide all the details about your token
                    </p>
                    <div className="text-start">
                      <InputView
                        name="Name"
                        placeholder="name of your token"
                        clickhandle={(e) => handleChange("name", e)}
                      />
                      <InputView
                        name="Symbol"
                        placeholder="symbol of your token eg. LUN"
                        clickhandle={(e) => handleChange("symbol", e)}
                      />
                      <InputView
                        name="Decimals"
                        placeholder="decimals"
                        clickhandle={(e) => handleChange("decimals", e)}
                      />
                      <InputView
                        name="Amount"
                        placeholder="amount"
                        clickhandle={(e) => handleChange("amount", e)}
                      />
                      <div className="mb-6 text-center">
                        <button
                          onClick={() => createToken(token)}
                          className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-wrap backdrop-blur-2xl transition-all duration-500"
                          type="submit"
                        >
                          <span className="fw-cold">Create Token </span>
                        </button>
                      </div>
                    </div>
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
        </section>
      ) : (
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
                      Link to your new token
                    </h4>
                    <p className="text-default-300 mx-auto mb-5 max-w-sm">
                      Your Solana Token Successfully created, Check now explorer
                    </p>
                    <div className="flex items-start justify-center">
                      <img
                        src={token.image || "image.png"}
                        alt="token Image"
                        className="h-40"
                      />
                    </div>
                    <div className="mt-5 w-full text-center">
                      {" "}
                      <p className="text-default-300 text-base font-medium leading-6">
                        <InputView
                          name={"Token Address"}
                          placeholder={tokenMintAddress}
                          clickhandle={(e) => null}
                        />
                        <span
                          className=" cursor-pointer"
                          onClick={() =>
                            navigator.clipboard.writeText(tokenMintAddress)
                          }
                        >
                          Copy
                        </span>
                      </p>
                      <div className="mb-6 text-center">
                        <a
                          href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=devnet`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500"
                        >
                          <span className="fw-bold"> View On Solana</span>
                        </a>
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
          </div>
        </section>
      )}
    </div>
  );
}
