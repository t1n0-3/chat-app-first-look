import { useState } from "react";

export default function useSessionStorage(key, initialValue) {
    const [state, setState] = useState(() => {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (err) {
            console.log('error with session storage');
            return initialValue;
        }
    });
    const setValue = (newValue) => {
        try {
            sessionStorage.setItem(key, newValue);
            setState(newValue);
        } catch (err) {
            console.log(err);
        }
    };

    return [state, setValue];
}
