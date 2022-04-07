
type Attributes<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any ? never : P;
}[keyof T];


export type ColorObj = {
  id: string
  title: string,
  color: string,
  rating: number
}

export class ColorData {
  constructor(
    private _id: string,
    private _title: string,
    private _color: string,
    private _rating: number = 0
  ) { }

  get id() { return this._id; }
  get title() { return this._title; }
  get color() { return this._color; }
  get rating() { return this._rating; }

  toObj(): ColorObj {
    return {
      id: this._id,
      title: this._title,
      color: this._color,
      rating: this._rating
    }
  }
  withRating(rating: number): ColorData {
    this._rating = rating;
    return this
  }
}

export const buildInitColors = (): ColorData[] => {
  return [
    new ColorData("x1", "dark turquoise", "#00ced1", 5),
    new ColorData("y2", "lawn green", "#7cfc00", 3),
    new ColorData("z3", "light salmon", "#ffa07a", 1)
  ];
}
