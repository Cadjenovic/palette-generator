import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import ColorBlock from "./components/ColorBlock";
import chroma from "chroma-js";

interface Color {
    hex: string;
}

function generateColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getSimilarColors(base: string): Color[] {
    const color = chroma(base);
    return Array.from({ length: 5 }, (_, i) => ({
        hex: color.set("hsl.h", color.get("hsl.h") + i * 10).hex()
    }));
}

const App: React.FC = () => {
    const [colors, setColors] = useState<Color[]>(
        Array(5)
            .fill(null)
            .map(() => ({ hex: generateColor() }))
    );

    const [similarRows, setSimilarRows] = useState<Color[][]>([]);

    const generatePalette = () => {
        setColors(
            Array(5)
                .fill(null)
                .map(() => ({ hex: generateColor() }))
        );
        setSimilarRows([]);
    };

    const handleColorClick = (
        hex: string,
        brightness: number,
        rowIndex: number | null = null
    ) => {
        const brightHex = chroma(hex).brighten(brightness).hex();
        navigator.clipboard.writeText(brightHex);
        toast.success(`Copied ${brightHex}`);

        const newRow = getSimilarColors(brightHex);

        if (rowIndex === null) {
            setSimilarRows([newRow]);
        } else {
            setSimilarRows((prev) => [...prev.slice(0, rowIndex + 1), newRow]);
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-start px-4 py-6'>
            <Toaster />
            <h1 className='text-4xl font-bold mb-6 text-gray-800'>
                🎨 Palette Generator
            </h1>
            <button
                onClick={generatePalette}
                className='mb-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition'
            >
                Generate Palette
            </button>

            <div className='flex w-full max-w-6xl h-48 gap-4 px-4'>
                {colors.map((color, idx) => (
                    <ColorBlock
                        key={idx}
                        hex={color.hex}
                        onClick={(hex, brightness) =>
                            handleColorClick(hex, brightness, null)
                        }
                    />
                ))}
            </div>

            {similarRows.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className='flex w-full max-w-6xl h-48 gap-4 mt-8 px-4'
                >
                    {row.map((color, idx) => (
                        <ColorBlock
                            key={idx}
                            hex={color.hex}
                            onClick={(hex, brightness) =>
                                handleColorClick(hex, brightness, rowIndex)
                            }
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default App;
