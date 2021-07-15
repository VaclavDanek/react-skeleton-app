// @flow
import React from 'react'
import Tooltip from 'rc-tooltip'

// types
import type { Tooltip as TooltipType } from '../Types/ValuesType'

// styles
import '../static/styles/components/switch.scss'

type SwitchProps = {
  className?: string,
  checked: boolean,
  disabled: boolean,
  id?: string,
  name?: string,
  onChange: (SyntheticInputEvent<HTMLInputElement>) => void,
  onClick?: () => void,
  tooltip?: TooltipType,
}

const Switch = (props: SwitchProps) => {
  const handleOnClick = (): void => {
    if (props.onClick) {
      props.onClick()
    }
  }

  const handleOnChange = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    props.onChange(event) // props.onChange(!props.checked)
  }

  const { className, disabled, checked, tooltip } = props
  const id = props.id || 'onoffswitch'
  const name = props.name || 'onoffswitch'
  const element = (
    <label className='onoffswitch-label' htmlFor={id} onClick={handleOnClick}>
      <span className='onoffswitch-inner' />
      <span className='onoffswitch-switch' />
    </label>
  )
  return (
    <div className={className || 'onoffswitch'}>
      <input
        key={name}
        className='onoffswitch-checkbox'
        disabled={disabled}
        checked={checked}
        id={id}
        name={name}
        onChange={handleOnChange}
        type='checkbox'
      />
      {!tooltip ? element :
        <Tooltip
          overlay={<div className='rc-tooltip-info'>{tooltip.text}</div>}
          placement={tooltip.align || 'bottom'} trigger={['hover']}
        >{element}</Tooltip>}
    </div>
  )
}

export default Switch
