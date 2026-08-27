import React, { useEffect, useRef } from 'react';

export const AtmosphericLight: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width * 0.7;
    let mouseY = height * 0.2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.008;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      ctx.clearRect(0, 0, width, height);

      // Subtle solar radiance bloom
      const sunX = mouseX + Math.sin(time) * 30;
      const sunY = mouseY + Math.cos(time * 0.8) * 20;

      const radialGrad = ctx.createRadialGradient(
        sunX,
        sunY,
        10,
        sunX,
        sunY,
        Math.max(width * 0.65, 500)
      );

      radialGrad.addColorStop(0, 'rgba(217, 119, 6, 0.14)');
      radialGrad.addColorStop(0.35, 'rgba(245, 158, 11, 0.05)');
      radialGrad.addColorStop(0.7, 'rgba(251, 191, 36, 0.015)');
      radialGrad.addColorStop(1, 'rgba(8, 11, 16, 0)');

      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Secondary ambient horizon glow
      const horizonGrad = ctx.createLinearGradient(0, height * 0.8, 0, height);
      horizonGrad.addColorStop(0, 'rgba(217, 119, 6, 0)');
      horizonGrad.addColorStop(1, 'rgba(217, 119, 6, 0.03)');
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, height * 0.8, width, height * 0.2);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
