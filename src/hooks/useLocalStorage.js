const useLocalStorage = (key, initialValue) => {
    // uncomment this if the values need to be saved in the localstate too
    // const [item, setItem] = React.useState(() => {
    //     return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : initialValue;
    // });

    const item = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : initialValue;

    const setValue = (value) => {
        // setItem(value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    return [item, setValue];
};

export default useLocalStorage;
