import { Translations } from "../translate/translate.model";
import { XAxisAnnotations } from "ng-apexcharts";
import { ApplicationSetting } from "../../models/application.model";

export class ChartUtil{

  public static CHART_HEIGHT = 450

  public static createEvent(tick: number, appSetting: ApplicationSetting, events: string[], defaultText: string, currentLang: string): XAxisAnnotations {
    const eventTextSet: Set<string> = new Set();
    for (const event of events){
      if (appSetting?.events_map && appSetting.events_map[event] && appSetting.events_map[event][currentLang]){
        eventTextSet.add(appSetting.events_map[event][currentLang]);
      } else {
        eventTextSet.add(defaultText);
      }
    }
    const eventText = Array.from(eventTextSet).join(" ");
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
        text: eventText
      }
    }
  }

}
