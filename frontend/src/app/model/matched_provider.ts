export class MatchedProvider {
  id: number;
  type: string;
  name: string;
  email: string;
  phone: string;
  _ID: string;
  status: number;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
