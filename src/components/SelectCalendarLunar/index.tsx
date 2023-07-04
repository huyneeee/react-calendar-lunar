import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import { useOnClickOutside } from '../../hook/useClickOutSide';
import { CalendarLunar } from '../CalendarLunar/index';
import './index.css';

const IconDate = ({ onClick }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    className='feather feather-calendar icon-date-select'
    onClick={onClick}
  >
    <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
    <line x1={16} y1={2} x2={16} y2={6} />
    <line x1={8} y1={2} x2={8} y2={6} />
    <line x1={3} y1={10} x2={21} y2={10} />
  </svg>
);

type ArgsHandleSelect = {
  fullDate: string;
  dateLunar: string;
  gioDauNgay: string;
  tiet: string;
  gioHoangDao: string;
  date: Date;
};

export interface PropsSelectCalendarLunar {
  handleSelect: (date: ArgsHandleSelect) => void;
  value: Date;
  format?: string;
}

export const SelectCalendarLunar = ({
  handleSelect,
  value,
  format,
}: PropsSelectCalendarLunar) => {
  const ref = useRef(null);
  const [isFocus, setIsFocus] = useState(false);

  useOnClickOutside(ref, () => {
    setIsFocus(false);
  });

  return (
    <div className='wrappper-select' ref={ref}>
      <input
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsFocus(!isFocus);
        }}
        className='input-select-datepicker'
        placeholder='dd/mm/yyyy'
        autoComplete='off'
        maxLength={10}
        value={dayjs(value).format(format ?? 'MM/DD/YYYY')}
      />
      <IconDate
        onClick={() => {
          setIsFocus(!isFocus);
        }}
      />
      {isFocus && (
        <div className='popup-calendar-select'>
          <CalendarLunar
            customStyle={{
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}
            handleSelect={(date) => {
              handleSelect(date);
              setIsFocus(false);
            }}
            value={value}
          />
        </div>
      )}
    </div>
  );
};
