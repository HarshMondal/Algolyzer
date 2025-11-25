import { useMemo, useRef, useEffect, useState } from 'react';
import { BAR_COLORS } from '../constants/colors';

interface BarVisualizationProps {
  value: number;
  maxValue: number;
  isHighlighted?: boolean;
  isCompared?: boolean;
  isSwapped?: boolean;
  isSorted?: boolean;
}

export default function BarVisualization({
  value,
  maxValue,
  isHighlighted = false,
  isCompared = false,
  isSwapped = false,
  isSorted = false,
}: BarVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(400);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.offsetHeight;
        setContainerHeight(height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const barColor = useMemo(() => {
    if (isSorted) return BAR_COLORS.SORTED;
    if (isSwapped) return BAR_COLORS.SWAPPED;
    if (isCompared) return BAR_COLORS.COMPARED;
    if (isHighlighted) return BAR_COLORS.COMPARED;
    return BAR_COLORS.DEFAULT;
  }, [isSorted, isSwapped, isCompared, isHighlighted]);

  const barStyle = useMemo(() => {
    const labelSpace = 36; // h-8 (32px) + mt-1 (4px) = 36px
    const availableHeight = containerHeight - labelSpace;
    const heightPercentage = maxValue > 0 ? value / maxValue : 0;
    const calculatedHeight = Math.max(availableHeight * heightPercentage, 10); // Min 10px
    
    const baseStyle: React.CSSProperties = {
      height: `${calculatedHeight}px`, // Use pixel height for accurate sizing
      backgroundColor: barColor,
      width: '100%',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: isSorted
        ? `0 0 8px ${barColor}, 0 0 16px ${barColor}60`
        : isCompared || isSwapped
        ? `0 0 12px ${barColor}, 0 0 24px ${barColor}40`
        : '0 2px 6px rgba(0, 0, 0, 0.3)',
      transform: isCompared || isSwapped ? 'scale(1.08)' : isSorted ? 'scale(1.02)' : 'scale(1)',
      border: isSorted ? `2px solid ${barColor}` : '2px solid rgba(55, 65, 81, 0.5)',
      borderRadius: '4px 4px 0 0',
    };
    return baseStyle;
  }, [barColor, isCompared, isSwapped, isSorted, value, maxValue, containerHeight]);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center justify-end flex-1 min-w-[20px] sm:min-w-[24px] max-w-[60px] h-full"
    >
      <div
        className="w-full"
        style={barStyle}
        aria-label={`Bar with value ${value}`}
        role="img"
      />
      <div className="w-full h-8 flex items-center justify-center mt-1 flex-shrink-0">
        <span className="text-sm font-bold text-gray-200 select-none drop-shadow-lg">
          {value}
        </span>
      </div>
    </div>
  );
}

