import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ApexYAxis } from "ng-apexcharts";
import { Record } from "../../../models/activity.model";
import { Translations } from "../../../shared/translate/translate.model";
import { CustomTranslateService } from "../../../shared/translate/services/custom-translate.service";
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { ApplicationSetting } from "../../../models/application.model";
import { GraphSetting, PositionHeatMapGraph } from "../../../models/graph.model";

@Component({
  selector: 'app-heatmap-chart',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent extends TranslateComponent implements OnChanges {

  SECTIONS = 5;

  @Input({required: true, alias: "part"}) part: "head" | "left_hand" | "right_hand";
  @Input({required: true}) records: Record[];
  @Input({required: true}) graphSetting: GraphSetting
  @Input({required: true}) appSetting: ApplicationSetting

  yAxis: ApexYAxis;
  xAxis: ApexXAxis;
  title: ApexTitleSubtitle;
  series: ApexAxisChartSeries;
  setting: ApexPlotOptions = {
    heatmap: {
      enableShades: false,
      colorScale: {
        ranges: []
      }
    },
  }
  chart: ApexChart = {
    height: 400,
    type: "heatmap",
    toolbar: {
      offsetY: 17,
    }
  }

  constructor(private translateService: CustomTranslateService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.setTitle()
      this.setChartSeries()
    }
  }

  setTitle() {
    const setting: PositionHeatMapGraph = this.graphSetting as PositionHeatMapGraph;

    this.title = {
      text: this.translateService.instantTranslation(Translations.position[this.part].all),
      align: "center",
      style: {
        fontSize: "16px"
      }
    }
    this.yAxis = {
      title: {
        text: this.translateService.instantTranslation(Translations.axis.x) + (setting.y_axis_unit ? ` [${setting.y_axis_unit}]` : "")
      }
    }
    this.xAxis = {
      title: {
        text: this.translateService.instantTranslation(Translations.axis.z) + (setting.x_axis_unit ? ` [${setting.x_axis_unit}]` : "")
      }
    }
  }

  setChartSeries() {
    let maxX: number = -99999999
    let minX: number = 99999999
    let maxZ: number = -99999999
    let minZ: number = 99999999

    for (const record of this.records) {
      const partData = record[this.part].position;
      maxX = Math.max(maxX, partData.x)
      minX = Math.min(minX, partData.x)
      maxZ = Math.max(maxZ, partData.z)
      minZ = Math.min(minZ, partData.z)
    }

    const xInterval = maxX - minX;
    const xStep = xInterval / this.SECTIONS;
    const zInterval = maxZ - minZ;
    const zStep = zInterval / this.SECTIONS;
    const xIntervals: { min: number, max: number }[] = [];
    const zIntervals: { min: number, max: number }[] = [];

    for (let i = 0; i < this.SECTIONS; i++) {
      xIntervals.push({min: minX + (i * xStep), max: i == this.SECTIONS - 1 ? (minX + ((i + 1) * xStep)) + 0.01 : minX + ((i + 1) * xStep)});
      zIntervals.push({min: minZ + (i * zStep), max: i == this.SECTIONS - 1 ? (minZ + ((i + 1) * zStep)) + 0.01 : minZ + ((i + 1) * zStep)});
    }

    const defSeries = xIntervals.map(x => {
      return {
        name: `${x.min.toFixed(2)} ― ${x.max.toFixed(2)}`,
        data: zIntervals.map(z => {
          return {
            x: `${z.min.toFixed(2)} ― ${z.max.toFixed(2)}`,
            y: 0
          };
        })
      }
    });

    let max = 0;

    for (const record of this.records) {
      const partData = record[this.part].position;
      const xIndex = xIntervals.findIndex(x => partData.x >= x.min && partData.x < x.max)
      const zIndex = zIntervals.findIndex(z => partData.z >= z.min && partData.z < z.max)
      if (xIndex !== -1 && zIndex !== -1) {
        const value = defSeries[xIndex].data[zIndex].y + 1;
        max = Math.max(value, max);
        defSeries[xIndex].data[zIndex].y = value;
      }
    }

    let ranges = [];
    const step = max / 10;

    for (let i = 0; i < 10; i++) {
      const from = Math.ceil(i * step)
      const to = Math.ceil((i + 1) * step)
      ranges.push({
        from: from,
        to: to,
        name: `${from} ― ${to}`,
        color: `rgba(0,41,109,${0.1 * (i + 1)})`
      },)
    }

    this.setting.heatmap.colorScale.ranges = ranges;
    this.series = defSeries;
  }

}
