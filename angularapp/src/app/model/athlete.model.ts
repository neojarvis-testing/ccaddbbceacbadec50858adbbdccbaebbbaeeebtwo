export interface Athlete {
  id?: number;
  name: string;
  age: number;
  email: string;
  phoneNumber: string;
  sportType: 'Soccer' | 'Basketball' | 'Tennis' | 'Swimming';
  teamName: string;
  ranking: number;
}
