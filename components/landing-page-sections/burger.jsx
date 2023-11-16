import { Button } from "@/components/ui/Buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <GiHamburgerMenu size={30} />
      </SheetTrigger>
      <SheetContent className={"bg-[#5B801A]"}>
        <SheetHeader>
          <div className="flex flex-col p-7 text-white gap-5 my-10">
            <div className="flex items-center justify-center gap-4 ">
              <Label htmlFor="name" className="text-2xl">
                <Link href="/login">LOGIN</Link>
              </Label>
              <Label htmlFor="name" className="text-2xl">
                {" "}
                |{" "}
              </Label>
              <Label htmlFor="name" className="text-2xl">
                <Link href="/signup">SIGNUP</Link>
              </Label>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Label htmlFor="username" className="text-2xl">
                <Link href="#home">HOME</Link>
              </Label>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Label htmlFor="username" className="text-2xl">
                <Link href="#about">ABOUT</Link>
              </Label>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Label htmlFor="username" className="text-2xl">
                <Link href="#process">PROCESS</Link>
              </Label>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Label htmlFor="username" className="text-2xl">
                <Link href="#contact">CONTACT</Link>
              </Label>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
