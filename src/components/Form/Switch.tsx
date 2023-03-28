// types
import type { ChangeEvent, MouseEvent, FocusEvent } from 'react'

// styles
import './styles/switch.scss'

interface ISwitchProps {
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
  disabled?: boolean;
  'data-for'?: string;
  'data-tip'?: any;
}

const Switch = (props: Readonly<ISwitchProps>): JSX.Element => {
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
    id = 'onoffswitch', 
    name = 'onoffswitch',
    readOnly = false,
    disabled = false,
    className = 'form-group',
    inputClasses = 'onoffswitch-checkbox',
    wrapperClasses = 'onoffswitch',
    label,
    value,
  } = props
  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}
      <div className={className}>
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
          type='checkbox'
        />
        <label 
          className='onoffswitch-label' 
          data-for={props['data-for']} 
          data-tip={props['data-tip']} 
          htmlFor={id} 
          onClick={handleOnClick}
        >
          <span className='onoffswitch-inner' />
          <span className='onoffswitch-switch' />
        </label>
      </div>
    </div>
  )
}

export default Switch
