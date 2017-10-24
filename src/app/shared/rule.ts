export interface Rule {
  name: string;
  rule: 'mandatory' | 'identicalGroup' | 'identical' | 'sequence' | 'any';
  args: any[];
  description?: string;
  bonus?: number;
}
