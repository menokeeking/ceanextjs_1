import { DateTime } from 'next-auth/providers/kakao';
import { DATE } from 'oracledb';
import React, { useState } from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';


registerLocale("es", es);

interface Props {
  fecha: string;
  selectedDate: Date | null;
  onChangeSelectedDate(date: Date | null): void
}

const MyDatePicker = ({fecha, selectedDate, onChangeSelectedDate}: Props) => {

  //alert(fecha)

  return (
    <div className="w-full">
      <DatePicker
        selected={selectedDate}
        onChange={onChangeSelectedDate}
        locale="es"
        placeholderText="Selecciona una fecha"
        dateFormat="dd/MM/yyyy"
        className="w-28 p-1 text-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 
                    block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        showYearDropdown
        scrollableMonthYearDropdown
      />
    </div>
  );
};

export default MyDatePicker;
