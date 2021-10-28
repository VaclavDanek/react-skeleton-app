// @flow
import React from 'react'
import I18n from 'i18n-react'
import classNames from 'classnames'

// components
import Field from './Field'

type FormProps = {
  autoComplete?: boolean,
  children?: React.Children,
  className?: string,
  disabled?: boolean,
  errors?: Array<string>,
  info?: string,
  name: string,
  noValidate?: boolean,
  onSubmit: () => void,
  submitLabel: string,
}

type FormState = {
  hasErrors: boolean,
}

export default class Form extends React.Component<FormProps, FormState> {

  fieldRefs: Array<React.ElementRef<Field>> = []

  static defaultProps = {
    autocomplete: 'on',
    className: 'p-3 border',
    noValidate: true,
  }

  state = {
    hasErrors: false,
  }

  handleOnSubmit = (event: SyntheticEvent<HTMLButtonElement>): void => {
    event.preventDefault()

    // show errors one by one
    /* const { hasErrors, onSubmit } = this.props
    if (!hasErrors) {
      for (const field of this.fieldRefs) {
        const { props, validate } = field
        const errors = validate(props.value)
        if (errors.length > 0) {
          this.setState({ hasErrors: true })
          return
        }
      }
      onSubmit()
    } */

    // show all errors immediately
    let hasErrors = false
    this.fieldRefs.forEach(field => {
      const { props, validate } = field
      const errors = validate(props.value)
      if (!hasErrors && errors.length > 0) {
        hasErrors = true
      }
    })
    if (!hasErrors) {
      this.props.onSubmit()
    }
    this.setState({ hasErrors })
  }

  render() {
    const { autoComplete, children, disabled, info, name, noValidate, submitLabel } = this.props
    const hasErrors = this.props.hasErrors || this.state.hasErrors

    const className = classNames({
      [this.props.className]: true,
      'border-danger': hasErrors,
    })

    const fields = React.Children.map(children, (child, index) => {
      const { type } = child
      if (type === (<Field />).type) {
        child = React.cloneElement(child, {
          ref: (ref) => { this.fieldRefs[index] = ref }
        })
      }
      return child
    })

    return (
      <form
        autoComplete={autoComplete}
        className={className}
        name={name}
        noValidate={noValidate}
      >
        {fields}
        {info && (
          <div className='alert alert-info' role='alert'>
            <i className='fa fa-info mr-3' />{info}
          </div>
        )}
        <button
          className='btn btn-primary btn-lg btn-block'
          disabled={disabled}
          onClick={this.handleOnSubmit}
          type='submit'
        >{submitLabel}</button>
      </form>
    )
  }
}
