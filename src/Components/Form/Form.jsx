// @flow
import React from 'react'
import I18n from 'i18n-react'
import classNames from 'classnames'

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
  errors: Array<string>,
}

export default class Form extends React.Component<FormProps, FormState> {

  static defaultProps = {
    autocomplete: 'on',
    className: 'p-3 border',
    noValidate: true,
  }

  state = {
    hasErrors: false,
  }

  handleOnSubmit = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault()

    // show errors one by one
    /* const { hasErrors, onSubmit } = this.props
    if (!hasErrors) {
      const fields = Object.keys(this.refs)
      for (let index = 0; index < fields.length; index++) {
        const field = fields[index]
        const { props, validate } = this.refs[field]
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
    Object.keys(this.refs).forEach(field => {
      const { props, validate } = this.refs[field]
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

    const fields = React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        ref: `field-${index}`
      })
    )

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
