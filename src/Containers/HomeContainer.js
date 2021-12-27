// @flow
import React from 'react'
import { connect } from 'react-redux'
import I18n from 'i18n-react'
import classNames from 'classnames'

// components
import Form from '../Components/Form'
import Field from '../Components/Form/Field.jsx'
import Checkbox from '../Components/Form/Checkbox.jsx'
import Switch from '../Components/Form/Switch.jsx'

// redux
import GeneralActions from '../Redux/GeneralRedux'
import UserDataActions from '../Redux/UserDataRedux'

// types
import type { GlobalState } from '../store/reducers'
import type { ValueObject } from '../Types/ValuesType'

// custom variables & functions

type ParentProps = {
  isMobile: boolean,
  scrollToElement: (HTMLElement | string) => void,
}

type StateProps = {
  userData: ValueObject,
}

type DispatchProps = {
  addAlert: () => void,
}

type HomeProps = ParentProps & StateProps & DispatchProps
type HomeState = {
  testForm: {
    [key: string]: any,
    errors: { [key: string]: string },
  }
}

class HomeScreen extends React.Component<HomeProps, HomeState> {
  state = {
    testForm: {
      errors: {},
      testCheckbox: false,
      testEmail: '',
      testNumber: 0,
      testSelect: '',
      testString: '',
      testSwitch: false,
      testText: '',
    }
  }

  handleOnInputChange = (value: any, name: string) => {
    this.setState((prevState) => {
      prevState.testForm[name] = value
      return ({ testForm: prevState.testForm })
    })
  }

  handleInputErrors = (inputErrors: Array<string>, name: string) => {
    this.setState((prevState) => {
      prevState.testForm.errors[name] = inputErrors
      return ({ testForm: prevState.testForm })
    })
  }

  handleOnSubmit = () => {
    this.props.addAlert({ message: 'Hotovo', type: 'success' })
    this.setState({ testForm: {
      errors: {},
      testCheckbox: false,
      testEmail: '',
      testNumber: 0,
      testSelect: '',
      testString: '',
      testSwitch: false,
      testText: '',
    }})
  }

  render() {
    const { errors, testEmail, testString, testNumber, testCheckbox, testSelect, testText, testSwitch } = this.state.testForm
    return (
      <div className='py-5' id='content'>
        <h1 className='text-center text-primary'><i aria-hidden='true' className='fa fa-info' /> React skeleton app</h1>
        <div className='container'>
          <h3 className='text-secondary'>Example form</h3>
          <Form
            name='testForm'
            onSubmit={this.handleOnSubmit}
            submitLabel='Dokončit'
          >
            <Field
              errors={errors.testString}
              id='testString'
              isAlphabetic
              label='testString'
              maxLength={8}
              minLength={4}
              name='testString'
              onError={this.handleInputErrors}
              onChange={this.handleOnInputChange}
              required
              tooltip={{ text: 'testString tooltip' }}
              type='string'
              value={testString}
            />
            <Field
              errors={errors.testEmail}
              id='testEmail'
              isEmail
              label='testEmail'
              name='testEmail'
              onError={this.handleInputErrors}
              onChange={this.handleOnInputChange}
              required
              tooltip={{ text: 'testEmail tooltip' }}
              type='email'
              value={testEmail}
            />
            <Field
              errors={errors.testNumber}
              id='testNumber'
              isNumber
              label='testNumber'
              max={100}
              min={1}
              name='testNumber'
              onError={this.handleInputErrors}
              onChange={this.handleOnInputChange}
              required
              step={1}
              tooltip={{ text: 'testNumber tooltip' }}
              type='number'
              value={testNumber}
            />
            <Field
              errors={errors.testSelect}
              id='testSelect'
              isAlphanumeric
              label='testSelect'
              name='testSelect'
              onError={this.handleInputErrors}
              onChange={this.handleOnInputChange}
              required
              tooltip={{ text: 'testSelect tooltip' }}
              value={testSelect}
            >
              <select>
                <option value='' />
                <option value='*,.-()'>*,.-()</option>
                <option value='value1'>value1</option>
                <option value='value2'>value2</option>
              </select>
            </Field>
            <Field
              errors={errors.testText}
              id='testText'
              label='testText'
              matches='^[a-ž\s\w\/\(\)\-\.\,]*$'
              name='testText'
              onChange={this.handleOnInputChange}
              tooltip={{ text: 'testText tooltip' }}
              value={testText}
            ><textarea cols='50' rows='5' /></Field>
            <Field
              id='testCheckbox'
              info='This checkbox field uses, for demonstrating, against the other fields above, its own state for storing errors.'
              inputClasses='toggle__input'
              name='testCheckbox'
              onChange={this.handleOnInputChange}
              required
              tooltip={{ text: 'testCheckbox tooltip' }}
              value={testCheckbox}
            ><Checkbox label='testCheckbox' /></Field>
            <Field
              id='testSwitch'
              info='This switch is the only input here, that is not validated at all.'
              inputClasses='onoffswitch-checkbox'
              label='testSwitch'
              name='testSwitch'
              onChange={this.handleOnInputChange}
              tooltip={{ text: 'testSwitch tooltip' }}
              value={testSwitch}
            ><Switch /></Field>
          </Form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: GlobalState) => ({
  userData: state.userData,
})

/* eslint-disable import/no-named-as-default-member */
const mapDispatchToProps = {
  addAlert: GeneralActions.addAlert,
}
/* eslint-enable import/no-named-as-default-member */

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
