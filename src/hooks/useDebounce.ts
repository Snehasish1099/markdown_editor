import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Set a timeout to update the debounced value after the specified delay
        const timer = setTimeout(() => setDebouncedValue(value), delay);

        // Clear the previous timeout if value or delay changes, or if the component unmounts
        return () => clearTimeout(timer);
    }, [value, delay]); 

    return debouncedValue;
}
