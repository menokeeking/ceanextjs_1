import { DateTime } from 'next-auth/providers/kakao';
import { DATE } from 'oracledb';
import React, { useState } from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { CalendarIcon} from '@heroicons/react/20/solid'


registerLocale("es", es);

interface Props {
  selectedDate: Date | null;
  onChangeSelectedDate(date: Date | null): void
}

const MyDatePicker = ({selectedDate, onChangeSelectedDate}: Props) => {

  //alert(fecha)

  return (
    <div className="">
      <DatePicker
        showIcon
        icon= {<CalendarIcon className="h-5 w-5 mt-1.5 text-gray-500" />}
        selected={selectedDate}
        onChange={onChangeSelectedDate}
        locale="es"
        placeholderText="Sel. Fecha"
        dateFormat="dd/MM/yyyy"
        className="w-32 my-1.5 text-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 
                    block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        showYearDropdown
        scrollableMonthYearDropdown
      />
    </div>
  );
};

export default MyDatePicker;
