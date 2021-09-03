import { useRef, useEffect } from 'react';

function useAutoScroll(length) {
    const element = useRef(null);
    const prevLength = useRef(length);

    useEffect(() => {
        if (prevLength.current < length && element.current) {
            element.current.scrollTop = element.current.scrollHeight;
        }
        prevLength.current = length;
    }, [length]);

    return element;
}

export default useAutoScroll;
