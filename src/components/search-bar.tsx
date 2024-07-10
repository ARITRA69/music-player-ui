"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex items-center justify-between bg-white/10 rounded-xl px-3 py-0.5 w-full">
      <Input
        placeholder={placeholder || "Search"}
        className="w-full bg-transparent outline-none"
        value={value}
        onChange={onChange}
      />
      <Search size={20} />
    </div>
  );
};
