import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // hoặc dùng <button>
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { MailIcon, Smartphone } from "lucide-react";

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Register
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground text-center">
          Welcome to the registration page
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button className="w-full rounded-[30px] border border-gray-300 flex items-center justify-center gap-2 py-2 shadow hover:bg-sky-500 active:translate-y-[2px] transition cursor-pointer">
          <MailIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Sign Up with Mail</span>
        </Button>

        <div className="mt-4 text-sm text-muted-foreground text-center">
          <span>Or continue with</span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button className="w-full rounded-[30px] border border-gray-300 flex items-center justify-center gap-2 py-2 shadow hover:bg-sky-500 active:translate-y-[2px] transition cursor-pointer">
            <Smartphone className="w-4 h-4" />
            <span className="text-sm font-medium">Sign Up with Phone</span>
          </Button>

          <div className="text-sm text-muted-foreground text-center">
            <span>Already have an account? </span>
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
