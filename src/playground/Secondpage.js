import React from 'react';
import useLocalStorage2 from '../hooks/useLocalStorage2';

export default function SecondPage() {
    const [value, setValue] = useLocalStorage2('textToRemember', '');

    return (
        <div>
            <div>
                <label>{value}</label>
            </div>
        </div>
    );
}
