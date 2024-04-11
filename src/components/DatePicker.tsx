import { DateTime } from 'next-auth/providers/kakao';
import { DATE } from 'oracledb';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  fecha: string;
}

const MyDatePicker: React.FC<Props> = ({fecha}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date (fecha));

  return (
    <div className="w-full">
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        placeholderText="Selecciona una fecha"
        dateFormat="dd/MM/yyyy"
        className="w-28 p-1 text-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

export default MyDatePicker;
