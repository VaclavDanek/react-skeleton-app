/* eslint-disable @typescript-eslint/no-unused-vars */

import { Observable, from } from 'rxjs'
import { catchError, switchMap, map, finalize } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import api from '../services/api'

// redux
import { GeneralTypes, GeneralActions } from '../redux/generalRedux'

export default []
