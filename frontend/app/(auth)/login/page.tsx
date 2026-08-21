import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@base-ui/react";
import { MailIcon } from "lucide-react";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription className="text-sm text-muted-foreground bold nav-title">
          Welcome to the login page
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full rounded-[30px] border border-gray-300 flex items-center justify-center gap-2 py-2 shadow hover:bg-sky-500 active:translate-y-[2px] transition cursor-pointer">
          <MailIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Sign in Mail</span>
        </Button>
      </CardContent>
    </Card>
  );
}
