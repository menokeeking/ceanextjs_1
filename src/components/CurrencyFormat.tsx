import React from 'react';

interface NumericObject {
  amount: number;
}

interface CurrencyFormatProps {
  numericObject: NumericObject;
}

const CurrencyFormat: React.FC<CurrencyFormatProps> = ({ numericObject }) => {
  // Configura el formateador para el peso mexicano
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  });

  // Formatea el valor como moneda
  const formattedValue = formatter.format(numericObject.amount);

  return <span>{formattedValue}</span>;
};

export default CurrencyFormat;