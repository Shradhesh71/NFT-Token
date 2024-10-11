"use client";

import Branding from "@/components/Branding";
import Navbar from "@/components/Navbar";
import { useForm, ValidationError } from "@formspree/react";
import { AiOutlineClose } from "react-icons/ai";
import "../../styles/globals.css";
import Footer from "@/components/Footer";

const key = process.env.FROMFREE!;

export default function ContactView() {
  const [state, handleSubmit] = useForm(key);
  if (state.succeeded) {
    console.log({
      type: "success",
      message: "Successfully submitted form",
    });
  }

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
                    Send email to us for more details
                  </h4>
                  <p className="text-default-300 mx-auto mb-5 max-w-sm text-white/70">
                    Send your message so we provide you more details
                  </p>
                  <div className=" text-start">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className=" text-base/normal text-default-200 mb-2 block font-semibold"
                        ></label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          className="border-default-200 block w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent"
                          placeholder="email"
                        />
                      </div>
                      <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                      />
                      <textarea
                        className="border-default-200 relative w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent"
                        name="message"
                        id="message"
                        rows={6}
                        placeholder="Message"
                      ></textarea>
                      <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                      />

                      <div className="mb-6 text-center">
                        <button
                          type="submit"
                          disabled={state.submitting}
                          className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-wrap backdrop-blur-2xl transition-all duration-500"
                        >
                          <span className="fw-cold"> Send Message </span>
                        </button>
                      </div>
                    </form>
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
      <Footer />
    </div>
  );
}
