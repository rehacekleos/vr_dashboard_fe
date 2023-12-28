import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Record } from "../../../models/activity.model";
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { Translations } from "../../../shared/translate/translate.model";
import { CustomTranslateService } from "../../../shared/translate/services/custom-translate.service";
import { TitleCasePipe } from "@angular/common";
import {
  ApexAnnotations,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexMarkers,
  ApexTitleSubtitle, ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from "ng-apexcharts";
import { ChartUtil } from "../../../shared/utils/chartUtil";
import { DifferenceGraph, GraphPart, GraphSetting } from "../../../models/graph.model";
import { ApplicationSetting } from "../../../models/application.model";

@Component({
  selector: 'app-positional-differential-chart',
  templateUrl: './positional-differential.component.html',
  styleUrls: ['./positional-differential.component.scss']
})
export class PositionalDifferentialComponent extends TranslateComponent implements OnInit, OnChanges{

  @Input({required: true, alias: "part"}) part: GraphPart;
  @Input({required: true}) records: Record[];
  @Input({required: true}) graphSetting: GraphSetting
  @Input({required: true}) appSetting: ApplicationSetting

  difference_x = [];
  difference_y = [];
  difference_z = [];
  events = [];

  series: ApexAxisChartSeries;
  chart: ApexChart = {
    type: "line",
    height: ChartUtil.CHART_HEIGHT,
    zoom: {
      type: "x",
      enabled: true,
    },
    toolbar: {
      offsetY: 17,
      autoSelected: "zoom"
    },
    animations: {
      enabled: false
    }
  };
  dataLabels: ApexDataLabels = {enabled: false};
  markers: ApexMarkers = {size: 0};
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yAxis: ApexYAxis = {}
  xAxis: ApexXAxis;
  legend: ApexLegend = {
    position: "top"
  };
  annotations: ApexAnnotations;
  tooltip: ApexTooltip;

  constructor(private translateService: CustomTranslateService,
              private titleCasePipe: TitleCasePipe) {
    super();

  }

  ngOnInit() {
    const setting: DifferenceGraph = this.graphSetting as DifferenceGraph;

    this.title = {
      text: this.translateService.instantTranslation(Translations.position[this.part].difference),
      align: "center",
      style: {
        fontSize: "16px"
      }
    }

    this.xAxis = {
      type: "numeric",
      title: {
        text: this.titleCasePipe.transform(this.translateService.instantTranslation(Translations.time))
      }
    }

    if (setting.unit){
      this.yAxis.title = {
        text: `[${setting.unit}]`
      }
    }

    this.tooltip = {
      y: {
        formatter(val: number, opts?: any): string {
          if (setting.unit){
            return `${val} [${setting.unit}]`
          }
          return val.toString();
        }
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.records) {
      this.prepareData();
      this.setChartData();
    }
  }

  private prepareData(){
    const setting: DifferenceGraph = this.graphSetting as DifferenceGraph;
    this.difference_x = [];
    this.difference_y = [];
    this.difference_z = [];
    this.events = [];

    let x_base = 0;
    let y_base = 0;
    let z_base = 0;

    if (setting.diff === "avg"){
      x_base = this.records.reduce((a, b) => a + b[this.part].position.x, 0) / this.records.length
      y_base = this.records.reduce((a, b) => a + b[this.part].position.y, 0) / this.records.length
      z_base = this.records.reduce((a, b) => a + b[this.part].position.z, 0) / this.records.length
    }

    let tick = 0;
    for (const record of this.records) {
      this.difference_x.push({x: tick, y: (-(x_base - record[this.part].position.x)).toFixed(2)});
      this.difference_y.push({x: tick, y: (-(y_base - record[this.part].position.y)).toFixed(2)});
      this.difference_z.push({x: tick, y: (-(z_base - record[this.part].position.z)).toFixed(2)});

      if (record.events){
        const defaultText = this.titleCasePipe.transform(this.translateService.instantTranslation(Translations.event));
        this.events.push(ChartUtil.createEvent(tick, this.appSetting, record.events, defaultText, this.translateService.currentLang));
      }
      tick++
    }
  }

  setChartData() {
    const setting: DifferenceGraph = this.graphSetting as DifferenceGraph;
    const series: ApexAxisChartSeries = [];

    if (setting.axis.x && setting.axis.x === true) {
      series.push({
        name: this.translateService.instantTranslation(Translations.axis.x),
        data: this.difference_x,
        color: "#E9142D"
      })
    }

    if (setting.axis.y && setting.axis.y === true) {
      series.push({
        name: this.translateService.instantTranslation(Translations.axis.y),
        data: this.difference_y,
        color: "#63E617"
      })
    }

    if (setting.axis.z && setting.axis.z === true) {
      series.push({
        name: this.translateService.instantTranslation(Translations.axis.z),
        data: this.difference_z,
        color: "#006AA7"
      })
    }

    if (setting.recommended_min){
      this.yAxis.min = (actualMin) => {
        return Math.min(actualMin, setting.recommended_min);
      }
    }

    if (setting.recommended_max){
      this.yAxis.max = (actualMax) => {
        return Math.max(actualMax, setting.recommended_max);
      }
    }

    this.series = series
    this.annotations = {
      xaxis: this.events
    }
  }

}
