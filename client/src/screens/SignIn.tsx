import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { SendImage } from "./views/SendImage";
import { CameraIcon } from "@radix-ui/react-icons";

export function SigninScreeen() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="bg-gray-200 p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4">
            Ministerio do Meio Ambiente - Login
          </CardTitle>
          <CardDescription>
            insira sua foto para ter acesso ao sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center mt-4 mb-3">
          <Button>
            <SendImage /> <CameraIcon className="ml-4 font-bold" />
          </Button>
        </CardContent>
        <CardFooter className="text-sm justify-center">
          Copyright@ mma-br
        </CardFooter>
      </Card>
    </div>
  );
}
