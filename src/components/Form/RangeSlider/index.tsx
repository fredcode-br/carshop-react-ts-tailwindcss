import { useState } from 'react';

interface Props {
    highest: number;
    lowest: number;
}

function RangeSlider({ highest, lowest }: Props) {
    const [leftValue, setLeftValue] = useState(0);
    const [rightValue, setRightValue] = useState(100); 
    const [draggingLeft, setDraggingLeft] = useState(false);
    const [draggingRight, setDraggingRight] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (draggingLeft) {
            handleLeftChange(e);
        } else if (draggingRight) {
            handleRightChange(e);
        }
    };

    const handleMouseUp = () => {
        setDraggingLeft(false);
        setDraggingRight(false);
    };

    const handleLeftMouseDown = () => {
        setDraggingLeft(true);
    };

    const handleRightMouseDown = () => {
        setDraggingRight(true);
    };

    const handleLeftChange = (e: React.MouseEvent<HTMLDivElement>) => {
        const containerWidth = e.currentTarget.parentElement?.clientWidth ?? 0;
        const clickPosition = e.clientX - (e.currentTarget.parentElement?.getBoundingClientRect().left ?? 0);
        let percentage = (clickPosition / containerWidth) * 100;

        percentage = Math.max(0, Math.min(percentage, rightValue));

        setLeftValue(percentage);
    };

    const handleRightChange = (e: React.MouseEvent<HTMLDivElement>) => {
        const containerWidth = e.currentTarget.parentElement?.clientWidth ?? 0;
        const clickPosition = e.clientX - (e.currentTarget.parentElement?.getBoundingClientRect().left ?? 0);
        let percentage = (clickPosition / containerWidth) * 100;

        percentage = Math.min(100, Math.max(percentage, leftValue));

        setRightValue(percentage);
    };

    return (
        <div className="flex mb-4 items-center h-16 justify-center" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <div className="py-1 relative min-w-full">
                <div className="h-2 bg-gray-200 rounded-full">
                    <div className="absolute h-2 rounded-full bg-black" style={{ left: `${leftValue}%`, width: `${rightValue - leftValue}%` }}></div>
                    <div className="absolute h-4 flex items-center justify-center w-4 rounded-full bg-white shadow border border-gray-300 -ml-3 top-0 cursor-pointer" unselectable="on" style={{ left: `${leftValue}%` }} onMouseDown={handleLeftMouseDown}>
                        <div className="relative -mt-2 w-1">
                            <div className="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full" style={{ marginLeft: '-45px' }}>
                                <div className="relative shadow-md">
                                    <div className="bg-black -mt-8 text-white truncate text-xs rounded py-1 px-4">R$ {((leftValue / 100) * (highest - lowest) + lowest).toFixed(2)}</div>
                                    <svg className="absolute text-black w-full h-2 left-0 top-100" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
                                        <polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute h-4 flex items-center justify-center w-4 rounded-full bg-white shadow border border-gray-300 -ml-3 top-0 cursor-pointer" unselectable="on" style={{ left: `${rightValue}%` }} onMouseDown={handleRightMouseDown}>
                        <div className="relative -mt-2 w-1">
                            <div className="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full" style={{ marginLeft: '-45px' }}>
                                <div className="relative shadow-md">
                                    <div className="bg-black -mt-8 text-white truncate text-xs rounded py-1 px-4">R$ {((rightValue / 100) * (highest - lowest) + lowest).toFixed(2)}</div>
                                    <svg className="absolute text-black w-full h-2 left-0 top-100" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
                                        <polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute text-gray-800 -ml-1 bottom-0 left-0 -mb-6">R$ {lowest.toFixed(2)}</div>
                    <div className="absolute text-gray-800 -mr-1 bottom-0 right-0 -mb-6">R$ {highest.toFixed(2)}</div>
                </div>
            </div>
        </div>
    );
}

export default RangeSlider;
