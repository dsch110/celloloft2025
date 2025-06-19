'use client';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProgressCircleProps {
  value: number;
}

export default function ProgressCircle({ value }: ProgressCircleProps) {
  return (
    <div className="w-24">
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          pathColor: '#3B82F6',
          textColor: '#1F2937',
          trailColor: '#E5E7EB'
        })}
      />
    </div>
  );
} 