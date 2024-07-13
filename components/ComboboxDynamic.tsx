"use client";

import * as React from "react";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useStaticCurrentType from "@/libs/store/useStaticCurrentType";
import useDynamicCurrentType from "@/libs/store/useDynamicCurrentType";

type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const statuses: Status[] = [
  {
    value: "url",
    label: "URL",
    icon: Circle,
  },
  {
    value: "sms",
    label: "SMS",
    icon: Circle,
  },
  {
    value: "email",
    label: "Email",
    icon: Circle,
  },
];

export function ComboboxStatic() {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  );
  const currStat = useDynamicCurrentType();

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">QR Type</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedStatus ? (
              <>
                <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                {selectedStatus.label}
              </>
            ) : (
              <>+ Set QR type</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value) ||
                          null
                      );
                      setOpen(false);
                      // here add the state for pages
                      if (status.value === "url") {
                        currStat.onOpenURL();
                      }
                      if (status.value === "email") {
                        currStat.onOpenEmail();
                      }
                      if (status.value === "sms") {
                        currStat.onOpenSMS();
                      }
                    }}
                  >
                    <status.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        status.value === selectedStatus?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
