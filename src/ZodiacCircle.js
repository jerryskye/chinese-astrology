'use client';

import { useEffect, useRef, useState } from 'react';
import animals from './helpers/animals';

const drawYinYang = (ctx, centerX, centerY, radius, isHovered) => {
  // Save the current context state
  ctx.save();

  // Main circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.closePath();

  if (isHovered) {
    // Create gradient for the border
    const gradient = ctx.createLinearGradient(
      centerX - radius,
      centerY - radius,
      centerX + radius,
      centerY + radius
    );
    gradient.addColorStop(0, '#4169e1');     // Royal blue
    gradient.addColorStop(0.5, '#1e90ff');   // Dodger blue
    gradient.addColorStop(1, '#87ceeb');     // Sky blue

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 5;
  } else {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
  }
  ctx.stroke();

  // Create a clip region for the main circle
  ctx.clip();

  // Draw the white (Yin) half
  ctx.beginPath();
  ctx.fillStyle = '#ffffff';
  ctx.arc(centerX, centerY, radius, 0, Math.PI);
  ctx.fill();

  // Draw the red (Yang) half
  ctx.beginPath();
  ctx.fillStyle = '#ff0000';
  ctx.arc(centerX, centerY, radius, Math.PI, Math.PI * 2);
  ctx.fill();

  // Draw the curved S shape
  ctx.beginPath();
  ctx.arc(centerX - radius/2, centerY, radius/2, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(centerX + radius/2, centerY, radius/2, 0, Math.PI * 2);
  ctx.fillStyle = '#ff0000';
  ctx.fill();

  // Draw the small circles
  ctx.beginPath();
  ctx.arc(centerX - radius/2, centerY, radius/6, 0, Math.PI * 2);
  ctx.fillStyle = '#ff0000';
  ctx.fill();
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(centerX + radius/2, centerY, radius/6, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Restore the context state
  ctx.restore();
};

const ZodiacCircle = ({ onAnimalSelect, selectedAnimal }) => {
  const canvasRef = useRef(null);
  const [hoveredSection, setHoveredSection] = useState(-1);
  const [isYinYangHovered, setIsYinYangHovered] = useState(false);

  const isPointInSection = (x, y, centerX, centerY, radius, sectionIndex) => {
    // Convert mouse coordinates to relative to center
    const dx = x - centerX;
    const dy = y - centerY;

    // Calculate angle from center to point
    let angle = Math.atan2(dy, dx) + Math.PI / 2;
    if (angle < 0) angle += Math.PI * 2;

    // Calculate section boundaries
    const sectionAngle = (Math.PI * 2) / 12;
    const sectionStart = sectionIndex * sectionAngle;
    const sectionEnd = (sectionIndex + 1) * sectionAngle;

    // Check if point is within radius and angle
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= radius && angle >= sectionStart && angle <= sectionEnd;
  };

  const isPointInYinYang = (x, y, centerX, centerY, radius) => {
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= radius * 0.2; // Same size as Yin-Yang symbol
  };

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    // Check if hovering over Yin-Yang
    if (isPointInYinYang(x, y, centerX, centerY, radius)) {
      setHoveredSection(-1);
      setIsYinYangHovered(true);
      canvas.style.cursor = 'pointer';
      return;
    }

    setIsYinYangHovered(false);

    let hoveredIndex = -1;
    for (let i = 0; i < 12; i++) {
      if (isPointInSection(x, y, centerX, centerY, radius, i)) {
        hoveredIndex = i;
        canvas.style.cursor = 'pointer';
        break;
      }
    }

    setHoveredSection(hoveredIndex);
    if (hoveredIndex === -1) {
      canvas.style.cursor = 'default';
    }
  };

  const handleMouseLeave = () => {
    setHoveredSection(-1);
    setIsYinYangHovered(false);
  };

  const handleClick = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    // Check if clicking on Yin-Yang
    if (isPointInYinYang(x, y, centerX, centerY, radius)) {
      onAnimalSelect(null); // Clear the filter
      return;
    }

    for (let i = 0; i < 12; i++) {
      if (isPointInSection(x, y, centerX, centerY, radius, i)) {
        onAnimalSelect(animals[i].name);
        break;
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    const drawSection = (index, isHovered) => {
      ctx.save();  // Save context before modifying for section
      const startAngle = (index * Math.PI * 2) / 12 - Math.PI / 2;
      const endAngle = ((index + 1) * Math.PI * 2) / 12 - Math.PI / 2;

      // Draw the main section
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      const animal = animals[index];
      ctx.fillStyle = animal.isYang ? '#ff0000' : '#ffffff';
      ctx.fill();

      if (isHovered || animal.name === selectedAnimal) {
        // Create gradient for the border
        const midAngle = (startAngle + endAngle) / 2;
        const gradientStartX = centerX + (radius - 5) * Math.cos(midAngle);
        const gradientStartY = centerY + (radius - 5) * Math.sin(midAngle);
        const gradientEndX = centerX + (radius + 5) * Math.cos(midAngle);
        const gradientEndY = centerY + (radius + 5) * Math.sin(midAngle);

        const gradient = ctx.createLinearGradient(
          gradientStartX,
          gradientStartY,
          gradientEndX,
          gradientEndY
        );

        gradient.addColorStop(0, '#4169e1');     // Royal blue
        gradient.addColorStop(0.5, '#1e90ff');   // Dodger blue
        gradient.addColorStop(1, '#87ceeb');     // Sky blue

        // Draw the border with clipping to prevent overlap
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius + 5, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.clip();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.restore();
      } else {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Add animal name
      ctx.translate(centerX, centerY);
      ctx.rotate((startAngle + endAngle) / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#000000';
      ctx.font = '14px Arial';
      ctx.fillText(animal.name, radius * 0.7, 0);
      ctx.restore();
    };

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw all sections
      animals.forEach((_, index) => {
        drawSection(index, index === hoveredSection);
      });

      // Reset context state before drawing Yin-Yang
      ctx.lineWidth = 1;

      // Draw Yin-Yang in center
      drawYinYang(ctx, centerX, centerY, radius * 0.2, isYinYangHovered);
    };

    render();
  }, [hoveredSection, isYinYangHovered, selectedAnimal]);

  return (
    <canvas
      ref={canvasRef}
      width={380}
      height={380}
      style={{ margin: '0 auto', display: 'block', cursor: 'pointer' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    />
  );
};

export default ZodiacCircle;
