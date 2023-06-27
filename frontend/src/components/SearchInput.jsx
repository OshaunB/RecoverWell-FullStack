import { Input } from "@material-tailwind/react";

export default function SearchInput({ onChange, value, innerText }) {
  return (
    <div className="w-72 border-black-500">
      <Input
        onChange={onChange}
        value={value}
        label={innerText}
      />
    </div>
  );
}
