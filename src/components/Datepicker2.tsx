import React from 'react';
import { Control, Controller } from 'react-hook-form';
import DatePicker, {registerLocale}  from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

registerLocale("es", es);

interface DatePickerFieldProps {
  control: Control;
  name: string;
  date: Date;
  manejarCambio: (date: Date, name:string) => void;
}


export const DatePickerField: React.FC<DatePickerFieldProps> = ({ control, name, date, manejarCambio }) => (
  <Controller
    control={control}
    name={name}
    defaultValue={date}
    render={({ field: { onChange, value } }) => (
      <DatePicker
        selected={value}
        onChange={(date: Date) => {
          onChange(date);
          manejarCambio(date, name);
        }}
        locale="es"
        dateFormat='dd/MM/yyyy'
        className="w-28 py-1.5 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm lg:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 
                    block"
        showYearDropdown
        scrollableMonthYearDropdown
      />
    )}
  />
);