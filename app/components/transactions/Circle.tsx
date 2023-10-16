import React, { useEffect, useRef } from 'react';

export const Circle = ({ color }: { color: string }): React.ReactNode => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (context) {
            // @ts-expect-error isn't null
            canvas.width = 20;
            // @ts-expect-error isn't null
            canvas.height = 20;

            const centerX = canvas ? canvas.width / 2 : 0;
            const centerY = canvas ? canvas.height / 2 : 0;
            const radius = 10;

            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.fillStyle = color;
            context.fill();
            context.closePath();
        }
    }, [color]);

    return (
        <canvas ref={canvasRef} />
    );
};
