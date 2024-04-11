import { useState, useEffect } from 'react';

interface Props {
    message: string;
    timeout: number;
}

const Alert = ({ message, timeout = 2500 }: Props) => {
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

        <div className={`${showAlert ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`}>
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline text-xs">{message}</span>
        </div>
        
        //<div className={`${showAlert ? 'block' : 'hidden'} bg-red-600 text-white text-xs p-3 shadow-md`}>
        //    {message}
        //</div>
    );
};

export default Alert;