import { useMemo } from 'react';
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
  const heightPercentage = useMemo(() => {
    return maxValue > 0 ? (value / maxValue) * 100 : 0;
  }, [value, maxValue]);

  const barColor = useMemo(() => {
    if (isSorted) return BAR_COLORS.SORTED;
    if (isSwapped) return BAR_COLORS.SWAPPED;
    if (isCompared) return BAR_COLORS.COMPARED;
    if (isHighlighted) return BAR_COLORS.COMPARED;
    return BAR_COLORS.DEFAULT;
  }, [isSorted, isSwapped, isCompared, isHighlighted]);

  const barStyle = useMemo(() => {
    // Calculate height with a minimum to ensure bars are visible
    const calculatedHeight = Math.max(heightPercentage, 5); // At least 5% height
    
    const baseStyle: React.CSSProperties = {
      height: `${calculatedHeight}%`,
      backgroundColor: barColor,
      minHeight: '20px', // Increased minimum height
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: isSorted
        ? `0 0 8px ${barColor}, 0 0 16px ${barColor}60`
        : isCompared || isSwapped
        ? `0 0 12px ${barColor}, 0 0 24px ${barColor}40`
        : '0 2px 6px rgba(0, 0, 0, 0.3)',
      transform: isCompared || isSwapped ? 'scale(1.08)' : isSorted ? 'scale(1.02)' : 'scale(1)',
      border: isSorted ? `2px solid ${barColor}` : '2px solid rgba(55, 65, 81, 0.5)',
    };
    return baseStyle;
  }, [heightPercentage, barColor, isCompared, isSwapped, isSorted]);

  return (
    <div className="flex flex-col items-center justify-end flex-1 min-w-[10px] sm:min-w-[12px] px-0.5 sm:px-1 h-full pb-6">
      <div
        className="w-full rounded-t-lg"
        style={barStyle}
        aria-label={`Bar with value ${value}`}
        role="img"
      />
      <span className="text-xs font-bold text-gray-200 mt-1 hidden sm:block select-none drop-shadow-lg">
        {value}
      </span>
    </div>
  );
}

