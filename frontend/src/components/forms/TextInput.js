const TextInput = ({fieldType, fieldName, fieldLabel, fieldValue, eventHandler, fieldClasses }) => {   
  return (
    <>
      <label htmlFor={fieldName}>{fieldLabel}</label>
      <input
        field={fieldType}
        name={fieldName}
        id={fieldName}
        value={fieldValue}
        className={fieldClasses}
        onChange={eventHandler}
      />
    </>
  )
};

export default TextInput;