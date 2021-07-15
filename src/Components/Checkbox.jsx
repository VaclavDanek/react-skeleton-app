// @flow
import React from 'react'
import Tooltip from 'rc-tooltip'

// types
import type { Tooltip as TooltipType } from '../Types/ValuesType'

// styles
import '../static/styles/components/checkbox.css'

type CheckboxProps = {
  className?: string,
  checked: boolean,
  id?: string,
  name?: string,
  onChange: (boolean) => void,
  onClick?: () => void,
  tooltip?: TooltipType,
}

const Checkbox = (props: CheckboxProps) => {
  const handleOnClick = (): void => {
    if (props.onClick) {
      props.onClick()
    }
  }

  const handleOnChange = (): void => {
    props.onChange(!props.checked)
  }

  const { className, disabled, checked, label, tooltip } = props
  const id = props.id || 'toggle'
  const name = props.name || 'toggle'
  const element = (
    <span className='toggle__label' onClick={handleOnClick}>
      <span className='toggle__text'>
        <b>{label}</b>
      </span>
    </span>
  )
  return (
    <div className={className}>
      <label className='toggle mb-0' htmlFor={id}>
        <input
          key={name}
          className='toggle__input'
          disabled={disabled}
          checked={checked}
          id={id}
          name={name}
          onChange={handleOnChange}
          type='checkbox'
        />
        <input name={`_${name}`} type='hidden' value='on' />
        {!tooltip ? element :
          <Tooltip
            overlay={<div className='rc-tooltip-info'>{tooltip.text}</div>}
            placement={tooltip.align || 'bottom'} trigger={['hover']}
          >{element}</Tooltip>}
      </label>
    </div>
  )
}

export default Checkbox
