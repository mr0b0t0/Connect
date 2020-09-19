import React from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';

const Autocomplete = ({options, setOption, label}) => {
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
      } = useAutocomplete({
        id: 'autocomplete-input',
        options,
        getOptionLabel: option => option,
        onChange: (e, value) => setOption(value),
        onInputChange: (e, value) => setOption(value),
        freeSolo: true
    });
    return (
        <div className='autocomplete'>
            <div className='input-wrap' {...getRootProps()}>
                <label {...getInputLabelProps()}>
                    {label}
                </label>
                <input {...getInputProps()}/>
            </div>
            {groupedOptions.length > 0 ? (
            <ul className='listbox' {...getListboxProps()}>
                {groupedOptions.map((option, index) => (
                <li {...getOptionProps({ option, index })}>{option}</li>
                ))}
            </ul>
            ) : null}
      </div>
    );
}

export default Autocomplete;
