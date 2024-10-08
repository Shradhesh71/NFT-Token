interface Brandingprops {
  image: string;
  title: string;
  message: string;
}

export default function Branding({ image, title, message }: Brandingprops) {
  return (
    <div className="ps-4 hidden py-4 lg:block">
      <div className=" relative h-full w-full overflow-hidden rounded-xl">
        <img
          src={`assets/images/ai/${image}.jpg`}
          alt="image"
          className="h-full w-full -scale-x-100 transform"
        ></img>
        <div className=" bg-default-950/40 absolute inset-0">
          <div className="flex h-full items-end justify-center">
            <div className="text-start p-6 ">
              {" "}
              <h5 className=" text-white mb-3 text-xl font-bold">
                Solana Token Creator
                <br />
                {title}
              </h5>
              <p className="text-default-400 text-white/50 text-base font-medium">{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
