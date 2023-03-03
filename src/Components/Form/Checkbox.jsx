// @flow
import React from 'react'

// styles
import '../../static/styles/components/checkbox.css'

type CheckboxProps = {|
  className?: string,
  'data-for'?: string,
  'data-tip'?: any,
  disabled?: boolean,
  id?: string,
  inputClasses?: string,
  label: string,
  name?: string,
  onBlur?: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  onChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  onClick?: (event: SyntheticEvent<HTMLSpanElement>) => void,
  onFocus?: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  readOnly?: boolean,
  required?: boolean,
  value: boolean,
  wrapperClasses?: string,
|}

const defaultProps = {
  id: 'toggle',
  name: 'toggle',
}

const Checkbox = (props: CheckboxProps): React.Node => {
  const handleOnClick = (event: SyntheticEvent<HTMLSpanElement>): void => {
    if (props.onClick) {
      props.onClick(event)
    }
  }

  const handleOnChange = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    const { disabled, onChange, readOnly } = props
    if (!disabled && !readOnly) {
      onChange(event) // props.onChange(!props.checked)
    }
  }

  const handleOnBlur = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    props.onBlur(event)
  }

  const handleOnFocus = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    props.onFocus(event)
  }

  const { className, disabled, id, inputClasses, label, name, readOnly, required, value, wrapperClasses } = {...defaultProps, ...props}
  return (
    <div className={wrapperClasses}>
      <label className='toggle mb-0' htmlFor={id}>
        <input
          key={name}
          className={inputClasses || className || 'toggle__input'}
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
          <span className='toggle__text'>{label}{required && <span className='text-danger'> *</span>}</span>
        </span>
      </label>
    </div>
  )
}

export default Checkbox
