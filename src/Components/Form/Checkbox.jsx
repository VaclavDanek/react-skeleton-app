// @flow
import React from 'react'

// styles
import '../../static/styles/components/checkbox.css'

// types

type CheckboxProps = {
  className?: string,
  'data-for'?: string,
  'data-tip'?: any,
  disabled?: boolean,
  id?: string,
  inputClasses?: string,
  label: string,
  name?: string,
  onBlur?: (SyntheticInputEvent<HTMLInputElement>) => void,
  onChange: (SyntheticInputEvent<HTMLInputElement>) => void,
  onClick?: (event: SyntheticEvent<HTMLSpanElement>) => void,
  onFocus?: (SyntheticInputEvent<HTMLInputElement>) => void,
  readOnly?: boolean,
  required?: boolean,
  value: boolean,
  wrapperClasses?: string,
}

const Checkbox = (props: CheckboxProps): React.Node => {
  const handleOnClick = (event: SyntheticEvent<HTMLSpanElement>): void => {
    if (props.onClick) {
      props.onClick()
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

  const { className, disabled, inputClasses, label, readOnly, required, value, wrapperClasses } = props
  const id = props.id || 'toggle'
  const name = props.name || 'toggle'
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
