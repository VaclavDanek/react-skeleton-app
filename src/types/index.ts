
export type ObjectType = Record<string, any>
export type ValuesType = Record<string, string | number>

export interface ScrollIntoViewOptions { 
  behavior?: 'auto' | 'smooth';
  block?: 'start' | 'center' | 'end' | 'nearest';
  inline?: 'start' | 'center' | 'end' | 'nearest';
}

export interface Alert { 
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'; 
  message: string; 
}

export interface Tooltip { 
  align?: string; 
  text: string; 
}

export interface Sort { 
  param: string; 
  desc?: boolean; 
}
