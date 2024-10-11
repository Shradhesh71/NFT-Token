"use client";

import styles from "../styles/Home.module.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className={styles.AppHeader}>
      <Link href={"/"}>
        <Image src="/image.png" height={30} width={200} alt="Solana Logo" />
      </Link>
      <Link href={"/"}>
        <span>SolanaCraft</span>
      </Link>
      <WalletMultiButton />
    </div>
  );
}
