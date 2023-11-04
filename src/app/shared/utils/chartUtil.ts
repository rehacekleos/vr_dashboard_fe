import { Translations } from "../translate/translate.model";
import { XAxisAnnotations } from "ng-apexcharts";

export class ChartUtil{

  public static CHART_HEIGHT = 450

  public static createEvent(tick: number, text: string): XAxisAnnotations {
    return {
      x: tick,
      strokeDashArray: 0,
      borderColor: "#000",
      label: {
        borderColor: "#000",
        style: {
          color: "#fff",
          background: "#000"
        },
        text: text
      }
    }
  }

}
