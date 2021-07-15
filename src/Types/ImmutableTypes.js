// @flow
import type { ValueObject } from './ValuesType'

export type DeepMergeType = {
  deep: boolean,
}

export type IteratorFunctionType = (value: ValueObject) => ValueObject

export type ObjectCreatorType = [string, ValueObject]

export type IteratorFunctionAsObjectType = (value: ValueObject) => ObjectCreatorType

export type ImmutableType = {
  from: (data: ValueObject) => ImmutableType,
  isImmutable: (data?: ValueObject) => boolean,
  merge: (data: ValueObject, deepMerge?: DeepMergeType) => ImmutableType,
  replace: (data: ValueObject, deepMerge?: DeepMergeType) => ImmutableType,
  without: (without: string | Array<string>) => ImmutableType,
  asMutable: (deepMerge?: DeepMergeType) => ValueObject,
  set: (key: string, value: ValueObject) => ImmutableType,
  setIn: (keyPath: Array<string>, value: ValueObject, deepMerge?: DeepMergeType) => ImmutableType,
  update: (key: string, updater: Function, ...functionArguments: ValueObject) => ImmutableType,
  updateIn: (keyPath: Array<string>, updater: Function, ...functionArguments: ValueObject) => ImmutableType,
  getIn: (keyPath: Array<string>, defaultValue?: ValueObject) => ValueObject,
  flatMap: (func: IteratorFunctionType) => ImmutableType,
  asObject: (func: IteratorFunctionAsObjectType) => ImmutableType,
}

export type AsMutable<T> = {
  asMutable: () => T
}

export type AsMutableString = string & AsMutable<string>
export type AsMutableArray = Array<any> & AsMutable<Array<any>>
