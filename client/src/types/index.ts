export interface Editor {
  title: string;
  text: string;
  saved: boolean | null;
  valid: boolean | null;
};

export interface Location {
  path: string;
  name: string;
}