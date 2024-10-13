import { useState } from "react";
import axios from "axios";
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
  const [isUploading, setIsUploading] = useState(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);
    setIsUploading(true);

    try {
      const response = await axios.post("http://localhost:5000/", formData);
      console.log("File uploaded successfully", response.data);
      alert("Upload realizado com sucesso!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Erro ao fazer upload");
      // alert("Upload realizado com sucesso!");
    } finally {
      setIsUploading(false);
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
        <form
          // action="http://localhost:5000/"
          method="post"
          encType="multipart/form-data"
        >
          <input
            id="fileInput"
            type="file"
            // accept="image/jpeg, image/png"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <p className="mt-4 text-sm text-gray-700">
              Arquivo selecionado: <strong>{selectedFile.name}</strong>
            </p>
          )}
          <Button onClick={handleSubmit} disabled={isUploading}>
            {isUploading ? "Enviando..." : "Enviar Imagem"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
