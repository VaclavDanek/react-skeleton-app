// types
import type { ModalType } from '../components/Modals'

export type ObjectType = Partial<Record<string, any>>
export type ValuesType = Partial<Record<string, string | number>>

export interface IScrollIntoViewOptions { 
  behavior?: 'auto' | 'smooth';
  block?: 'start' | 'center' | 'end' | 'nearest';
  inline?: 'start' | 'center' | 'end' | 'nearest';
}

export interface IAlert { 
  type: string; 
  message: string; 
}

export interface ITooltip { 
  align?: string; 
  text: string; 
}

export interface ISort { 
  param: string; 
  desc?: boolean; 
}

export type ModalsType = Partial<Record<ModalType, boolean>>
