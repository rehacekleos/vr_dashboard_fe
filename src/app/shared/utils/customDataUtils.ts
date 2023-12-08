export class CustomDataUtils{

  public static getAvgValue(values: number[]): number{
    const sum = values.reduce((a, b) => a + b, 0);
    return sum/values.length;
  }

  static getSumValue(values: number[]): number {
    return values.reduce((a, b) => a + b, 0);
  }

  static getMinValue(values: number[]): number {
    return Math.min(...values);
  }

  static getMaxValue(values: number[]): number {
    return Math.max(...values);
  }
}
