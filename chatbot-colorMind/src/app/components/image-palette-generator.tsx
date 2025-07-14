"use client";

import type React from "react";

import { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { usePaletteGenerator } from "../hooks/use-palette-generator";
import type { ColorInfo } from "../types/shared-types";
import { toast } from "../hooks/use-toast";

type ImagePaletteGeneratorProps = {
  updatePalette: (palette: ColorInfo[]) => void;
  updateTheme: (theme: string) => void;
};

export default function ImagePaletteGenerator({
  updatePalette,
  updateTheme,
}: ImagePaletteGeneratorProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { generatePalette } = usePaletteGenerator();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleGeneratePalette = async () => {
    if (!selectedFile) {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione uma imagem para gerar a paleta.",
        duration: 3000,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        const result = await generatePalette(
          `paleta da imagem ${selectedFile.name}`,
          `Gerar paleta baseada na imagem: ${selectedFile.name}`,
          base64Image
        );

        if (result.palette) {
          updatePalette(result.palette);
          updateTheme(`Cores da imagem: ${selectedFile.name}`);
          toast({
            title: "Paleta gerada com sucesso!",
            description:
              "As cores principais da sua imagem foram extraídas pela IA.",
            duration: 3000,
          });
        } else {
          toast({
            title: "Erro ao gerar paleta",
            description: `Não foi possível extrair as cores da imagem. Motivo: ${
              result.error || "Erro desconhecido"
            }.`,
            duration: 5000,
            variant: "destructive",
          });
        }
        setIsProcessing(false);
      };
      reader.onerror = (error) => {
        console.error("Erro ao ler o arquivo:", error);
        toast({
          title: "Erro ao ler arquivo",
          description: "Não foi possível ler a imagem. Tente novamente.",
          duration: 5000,
          variant: "destructive",
        });
        setIsProcessing(false);
      };
    } catch (error) {
      console.error("Erro ao gerar paleta da imagem:", error);
      toast({
        title: "Erro ao gerar paleta",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        duration: 5000,
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Gerar Paleta de Imagem</h2>
      <p className="text-gray-600 mb-4">
        Envie uma imagem para a IA extrair as cores principais e gerar uma
        paleta.
      </p>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <label
          htmlFor="picture"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Sua Imagem
        </label>
        <input
          id="picture"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isProcessing}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {selectedFile && (
          <p className="text-sm text-gray-500 mt-1">
            Arquivo selecionado: {selectedFile.name}
          </p>
        )}
      </div>
      <button
        onClick={handleGeneratePalette}
        disabled={!selectedFile || isProcessing}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processando...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Gerar Paleta da Imagem
          </>
        )}
      </button>
      <p className="text-xs text-gray-500 mt-4">
        Nota: A qualidade da paleta gerada depende da imagem e da capacidade da
        IA de interpretá-la.
      </p>
    </div>
  );
}
