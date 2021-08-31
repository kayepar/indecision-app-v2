import React, { useState } from 'react';
import { useOptionsContext } from '../context/optionsContext';

const AddForm = () => {
    const [error, setError] = useState(undefined);
    const { options, optionsDispatch } = useOptionsContext();

    const handleAddOption = (e) => {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const formError = validateForm(option);

        if (formError) {
            setError(formError);
        } else {
            optionsDispatch({ type: 'ADD_OPTION', option });
            e.target.elements.option.value = '';
            setError(undefined);
        }
    };

    const validateForm = (option) => {
        let error;

        if (!option) {
            error = 'Enter a valid option';
        } else if (ifOptionExists(option)) {
            error = `This option already exists (# ${getOptionIndex(option)})`;
        }

        return error;
    };

    const ifOptionExists = (option) => {
        return options.indexOf(option) > -1;
    };

    const getOptionIndex = (option) => {
        return options.findIndex((item) => item === option) + 1;
    };

    return (
        <div className="add-option-container">
            {error && <p className="add-option-error">{error}</p>}
            <form className="add-option" onSubmit={handleAddOption}>
                <input className="add-option__input" type="text" name="option" autoComplete="off" autoFocus></input>
                <button className="button">Add Option</button>
            </form>
        </div>
    );
};

export default AddForm;
