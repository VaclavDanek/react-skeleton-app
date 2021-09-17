// @flow
import React from 'react'
import I18n from 'i18n-react'
import ReactTooltip from 'react-tooltip'
import classNames from 'classnames'
import * as validator from '../../Utils/Validations'

// styles
import '../../static/styles/components/field.css'

// types
import type { Tooltip as TooltipType } from '../../Types/ValuesType'

type FieldProps = {
  disabled?: boolean,
  children?: React.Children,
  errors?: Array<string>,
  id: string,
  info?: string,
  inputClasses?: string,
  label?: string,
  name: string,
  onChange: (value: any, name: string) => void,
  onError?: (errors: Array<string>, name: string) => void,
  placeholder?: string,
  readOnly?: boolean,
  required?: boolean,
  tooltip?: TooltipType,
  type?: string,
  value: any,
  wrapperClasses?: string,
}

type FieldState = {
  errors: Array<string>,
}

// these props cannot be passed to a child component or input element
const propsFilter = Object.keys(validator).concat(['children', 'info', 'inputClasses', 'label', 'tooltip', 'wrapperClasses'])

export default class Field extends React.Component<FieldProps, FieldState> {

  static defaultProps = {
    inputClasses: 'form-control',
    wrapperClasses: 'form-group',
  }

  state = {
    errors: [],
  }

  handleOnChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { disabled, readOnly } = this.props
    if (disabled || readOnly) {
      return
    }

    const { checked, name, type, value } = event.target
    switch (type) {
      case 'checkbox':
        this.props.onChange(checked, name)
        break
      case 'number':
        this.props.onChange(Number(value), name)
        break
      default:
        this.props.onChange(value, name)
    }
  }

  handleOnBlur = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.validate(this.props.value)
  }

  handleOnFocus = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.handleErrors([], event.target.name)
  }

  handleErrors = (errors: Array<string>, fieldName: string = this.props.name) => {
    const { onError } = this.props
    if (onError) {
      onError(errors, fieldName)
    }
    else {
      this.setState({ errors })
    }
  }

  validate = (value: any): Array<string> => {
    const { name, required } = this.props
    const errors = []
    if (required && (value == null || value === '' || value === false)) {
      errors.push(I18n.translate(`errors.validation.input.isRequired`))
    }
    else {
      Object.keys(validator).forEach(key => {
        const validationParam = this.props[key]
        if (validationParam != null) { // validationParam !== undefined
          const validate = validator[key] // eslint-disable-line import/namespace
          const isValid = validationParam === true ? validate(value) : validate(value, validationParam)
          if (!isValid) {
            errors.push(I18n.translate(`errors.validation.input.${key}`, { validationParam }))
          }
        }
      })
    }
    this.handleErrors(errors, name)
    return errors
  }

  render() {
    const { children, id, info, inputClasses, label, required, tooltip, wrapperClasses } = this.props
    const errors = this.props.errors || this.state.errors

    const inputProps = {
      className: classNames({
        [inputClasses]: true,
        'is-invalid': errors.length > 0,
      }),
    }
    if (tooltip) {
      inputProps['data-tip'] = ''
      inputProps['data-for'] = `${id}-tooltip`
    }
    Object.keys(this.props).forEach(key => {
      if (!propsFilter.includes(key)) {
        inputProps[key] = this.props[key]
      }
    })

    let customComponent = null
    if (children) {
      const childElement = React.Children.only(children)
      if (React.isValidElement(childElement)) {
        customComponent = React.cloneElement(childElement, {
          ...inputProps,
          onBlur: this.handleOnBlur,
          onFocus: this.handleOnFocus,
          onChange: this.handleOnChange,
          ...childElement.props,
        })
      }
    }

    return [
      <div key={`field-${id}`} className={wrapperClasses}>
        <div className='position-relative'>
          {label && (
            <label htmlFor={id}>
              {label}{required && <span className='text-danger'> *</span>}
            </label>
          )}
          {customComponent || (
            <input
              {...inputProps}
              onBlur={this.handleOnBlur}
              onFocus={this.handleOnFocus}
              onChange={this.handleOnChange}
            />
          )}
          {tooltip && (
            <ReactTooltip effect='solid' id={`${id}-tooltip`} place={tooltip.align || 'bottom'} type={tooltip.type || 'info'}>
              <span>{tooltip.text}</span>
            </ReactTooltip>
          )}
          <div className='invalid-feedback feedback-icon'>
            <i className='fa fa-times' />
          </div>
        </div>
      </div>,
      errors.map((error, index) =>
        // eslint-disable-next-line react/no-array-index-key
        <div key={`field-${id}-error-${index}`} className='alert alert-danger' id={`${id}.errors`} role='alert'>
          <i className='fa fa-exclamation mr-3' />{error}
        </div>
      ),
      info && (
        <div key={`field-${id}-info`} className='alert alert-info' role='alert'>
          <i className='fa fa-info mr-3' />{info}
        </div>
      ),
    ]
  }
}
