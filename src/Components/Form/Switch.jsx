// @flow
import React from 'react'

// styles
import '../../static/styles/components/switch.scss'

// types

type SwitchProps = {
  className?: string,
  'data-for'?: string,
  'data-tip'?: any,
  disabled?: boolean,
  id?: string,
  inputClasses?: string,
  name?: string,
  onBlur?: (SyntheticInputEvent<HTMLInputElement>) => void,
  onChange: (SyntheticInputEvent<HTMLInputElement>) => void,
  onClick?: (event: SyntheticEvent<HTMLLabelElement>) => void,
  onFocus?: (SyntheticInputEvent<HTMLInputElement>) => void,
  readOnly?: boolean,
  value: boolean,
  wrapperClasses?: string,
}

const Switch = (props: SwitchProps): React.Node => {
  const handleOnClick = (event: SyntheticEvent<HTMLLabelElement>): void => {
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

  const { className, disabled, inputClasses, readOnly, value, wrapperClasses } = props
  const id = props.id || 'onoffswitch'
  const name = props.name || 'onoffswitch'
  return (
    <div className={wrapperClasses || 'onoffswitch'}>
      <input
        key={name}
        className={inputClasses || className || 'onoffswitch-checkbox'}
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
      <label className='onoffswitch-label' data-for={props['data-for']} data-tip={props['data-tip']} htmlFor={id} onClick={handleOnClick}>
        <span className='onoffswitch-inner' />
        <span className='onoffswitch-switch' />
      </label>
    </div>
  )
}

export default Switch
