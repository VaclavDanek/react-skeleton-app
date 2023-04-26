// types
import type { ChangeEvent, MouseEvent, FocusEvent } from 'react'

// styles
import './styles/checkbox.css'

interface CheckboxProps {
  id?: string;
  name?: string;
  className?: string;
  inputClasses?: string;
  wrapperClasses?: string;
  label?: string;
  value: boolean;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  required?: boolean;
  disabled?: boolean;
  'data-for'?: string;
  'data-tip'?: any;
}

const Checkbox = (props: Readonly<CheckboxProps>): JSX.Element => {
  const handleOnClick = (event: MouseEvent<HTMLSpanElement>): void => {
    if (props.onClick) {
      props.onClick(event)
    }
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { disabled, onChange, readOnly } = props
    if (!disabled && !readOnly) {
      onChange(event) // props.onChange(!props.checked)
    }
  }

  const handleOnBlur = (event: FocusEvent<HTMLInputElement>): void => {
    if (props.onBlur) {
      props.onBlur(event)
    }
  }

  const handleOnFocus = (event: FocusEvent<HTMLInputElement>): void => {
    if (props.onFocus) {
      props.onFocus(event)
    }
  }

  const { 
    id = 'toggle', 
    name = 'toggle', 
    required = false, 
    readOnly = false, 
    disabled = false,
    className = 'toggle mb-0', 
    inputClasses = 'toggle__input', 
    wrapperClasses, 
    label, 
    value, 
  } = props
  return (
    <div className={wrapperClasses}>
      <label className={className} htmlFor={id}>
        <input
          key={name}
          className={inputClasses}
          disabled={disabled}
          checked={value}
          id={id}
          name={name}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onChange={handleOnChange}
          readOnly={readOnly}
          required={required}
          type='checkbox'
        />
        <input name={`_${name}`} type='hidden' value='on' />
        <span className='toggle__label' data-for={props['data-for']} data-tip={props['data-tip']} onClick={handleOnClick}>
          {label && (
            <span className='toggle__text'>
              {label}{required && <span className='text-danger'> *</span>}
            </span>
          )}
        </span>
      </label>
    </div>
  )
}

export default Checkbox
