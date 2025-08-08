export interface PropData {
  name: string;
  type: string;
  defaultValue?: any;
  description: string;
}

export interface ComponentProps {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  code: {
    tsx: string;
  };
  props: PropData[];
}
