import React from 'react';
import useLocalStorage2 from '../hooks/useLocalStorage2';

export default function FirstPage() {
    const [value, setValue] = useLocalStorage2('textToRemember', '');

    return (
        <div>
            <div>
                <label>Something Memorable</label>
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
        </div>
    );
}
