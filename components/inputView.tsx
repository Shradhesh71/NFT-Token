interface InputViewProps {
  placeholder: string;
  name: string;
  clickhandle: (e:any) => void;
}

export default function InputView({
  placeholder,
  name,
  clickhandle,
}: InputViewProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor="input-label"
        className=" text-base/normal text-default-200 mb-2 block font-semibold"
      >
        {name}
      </label>
      <input
        type="text"
        id="input-label"
        onChange={clickhandle}
        placeholder={placeholder}
        className="borer-default-200 block w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent"
      ></input>
    </div>
  );
}
