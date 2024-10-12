import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

export function SendImage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>entrar</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecione sua foto para entrar</DialogTitle>
          <DialogDescription>
            Escolha sua foto e o sistema ira liberar seu acesso.
          </DialogDescription>
        </DialogHeader>
        <input
          id="fileInput"
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
        />
        {selectedFile && (
          <p className="mt-4 text-sm text-gray-700">
            Arquivo selecionado: <strong>{selectedFile.name}</strong>
          </p>
        )}
        <Button>enviar imagem</Button>
      </DialogContent>
    </Dialog>
  );
}
