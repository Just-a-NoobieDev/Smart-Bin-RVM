"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Buttons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import supabase from "@/lib/supabase-browser";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ComboboxDemo({ value, setValue }) {
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = React.useState([]);

  React.useEffect(() => {
    const getSubject = async () => {
      const { data, error } = await supabase.from("tbl_subjects").select("*");

      const subject = [];

      if (error) {
      } else {
        data.map((item) => {
          subject.push({
            value: item.id,
            label: `${item.subject_code} ${item.subject_name} - ${item.subject_instructor}`,
          });
        });
        setSubject(subject);
      }
    };

    getSubject();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-[#606060] bg-white border border-[#e6e6e6] hover:bg-white"
        >
          {value
            ? subject.find((subj) => subj.value === value)?.label
            : "Select Subject..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[320px] p-0">
        <Command>
          <CommandInput placeholder="Search Subject..." />
          <CommandEmpty>No Subject found.</CommandEmpty>
          <ScrollArea className="h-[150px]">
            <CommandGroup>
              {subject.map((subj) => (
                <CommandItem
                  key={subj.value}
                  value={subj.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === subj.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {subj.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
