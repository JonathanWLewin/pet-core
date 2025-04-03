export type Pet = {
  name: string;
  breed: string;
  sex: 'male' | 'female';
  currentConditions: string;
  status: string[];
  medication: string[];
  notes: string[];
  weight: number;
  uri: string;
  id: string;
};