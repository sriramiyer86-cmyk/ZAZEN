
export interface ModelSpec {
  id: string;
  name: string;
  capacity: string;
  description: string;
  specs: string[];
  imagePrompt: string;
  vertical?: 'freezer' | 'chiller';
}

export interface TickerData {
  label: string;
  value: string;
  sub: string;
  status: 'normal' | 'alert' | 'good';
}

export interface TechnicalDoc {
  id: string;
  title: string;
  category: string;
  content: string;
}
