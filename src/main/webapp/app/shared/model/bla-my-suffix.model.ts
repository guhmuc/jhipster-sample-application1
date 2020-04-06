export interface IBlaMySuffix {
  id?: number;
  foo?: string;
  bar?: string;
}

export class BlaMySuffix implements IBlaMySuffix {
  constructor(public id?: number, public foo?: string, public bar?: string) {}
}
