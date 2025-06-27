export interface Country {
  flags: {
    png: string;
    svg: string;
    alt?: string; // optional because it can be an empty string or missing
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      [languageCode: string]: {
        official: string;
        common: string;
      };
    };
  };
  capital: string[];
  region: string;
  population: number;
}
