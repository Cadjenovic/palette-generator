import React, { useEffect, useState } from "react";
import chroma from "chroma-js";

interface Props {
    hex: string;
    onClick: (hex: string, brightness: number) => void;
}

const LockIcon = ({ locked }: { locked: boolean }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='white'
        className='w-4 h-4'
    >
        {locked ? (
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 10.5v-2a4.5 4.5 0 10-9 0v2m-1.5 0h12a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-12a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z'
            />
        ) : (
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 10.5v-2a4.5 4.5 0 10-9 0v2m-1.5 0h12a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-12a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z'
            />
        )}
    </svg>
);

const ColorBlock: React.FC<Props> = ({ hex, onClick }) => {
    const [brightness, setBrightness] = useState(0);
    const [adjustedHex, setAdjustedHex] = useState(hex);
    const [locked, setLocked] = useState(false);

    useEffect(() => {
        setAdjustedHex(chroma(hex).brighten(brightness).hex());
    }, [hex, brightness]);

    return (
        <div
            className='flex-1 h-full rounded-lg cursor-pointer relative transition-transform transform hover:scale-105 flex flex-col justify-end p-2'
            style={{ backgroundColor: adjustedHex }}
            onClick={() => !locked && onClick(hex, brightness)}
        >
            {/* Lock Button */}
            <div className='absolute top-2 left-2'>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setLocked(!locked);
                    }}
                    className='text-white bg-black/40 p-1 rounded-full'
                    title='Toggle lock'
                >
                    <LockIcon locked={locked} />
                </button>
            </div>

            {/* Vertical Slider */}
            <input
                type='range'
                min={-1}
                max={1}
                step={0.1}
                value={brightness}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setBrightness(parseFloat(e.target.value))}
                className='absolute right-2 top-8 bottom-8 rotate-180 accent-white'
                style={{ writingMode: "vertical-lr" }}
            />

            {/* Hex Label */}
            <div className='absolute bottom-2 left-2 text-white text-sm font-bold drop-shadow'>
                {adjustedHex}
            </div>
        </div>
    );
};

export default ColorBlock;
