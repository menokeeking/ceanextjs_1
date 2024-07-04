import { useState, useEffect } from 'react';

interface Props {
    message: string;
    timeout: number;
}

const Alert_s = ({ message, timeout = 2500 }: Props) => {
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, timeout);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className={`${showAlert ? 'block' : 'hidden'} bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative`}>
            <strong className="font-bold"> Proceso Exitoso! </strong>
            <span className="sm:inline text-xs">{message}</span>
        </div>
    );
};

export default Alert_s;