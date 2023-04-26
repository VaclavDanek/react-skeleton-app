/* eslint-disable @typescript-eslint/no-unused-vars */

import { from } from 'rxjs'
import { catchError, switchMap, map, finalize } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import api from '../services/api'

// redux
import { generalTypes, generalActions } from '../redux/generalRedux'

// types
import type { AnyAction } from 'redux'
import type { OperatorFunction, Observable } from 'rxjs'
import type { AxiosResponse } from 'axios'
import type { StateObservable } from 'redux-observable'
import type { AxiosError } from '../types/errorTypes'
import type { State } from '../store/reducers'

export default []
