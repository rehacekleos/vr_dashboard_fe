import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Record } from "../../../models/activity.model";
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { CustomTranslateService } from "../../../shared/translate/services/custom-translate.service";
import { Translations } from "../../../shared/translate/translate.model";
import { TitleCasePipe } from "@angular/common";
import {
  ApexAnnotations,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill, ApexLegend,
  ApexMarkers,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from "ng-apexcharts";
import { ChartUtil } from "../../../shared/utils/chartUtil";
import { GraphPart, GraphSetting, MultipleAxisGraph } from "../../../models/graph.model";

@Component({
  selector: 'app-rotation-chart',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss']
})
export class RotationComponent extends TranslateComponent implements OnInit, OnChanges {

  @Input({required: true, alias: "part"}) part: GraphPart;
  @Input({required: true}) records: Record[];
  @Input({required: true}) graphSetting: GraphSetting

  rotation_x = [];
  rotation_y = [];
  rotation_z = [];
  events = [];

  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yAxis: ApexYAxis;
  xAxis: ApexXAxis;
  legend: ApexLegend;
  annotations: ApexAnnotations;
  tooltip: ApexTooltip;

  constructor(private translateService: CustomTranslateService,
              private titleCasePipe: TitleCasePipe) {
    super();
  }

  ngOnInit(): void {
    this.chart = {
      type: "line",
      height: ChartUtil.CHART_HEIGHT,
      zoom: {
        type: "x",
        enabled: true
      },
      toolbar: {
        autoSelected: "zoom"
      },
      animations: {
        enabled: false
      }
    }
    this.xAxis = {
      type: "numeric"
    }
    this.title = {
      text: this.translateService.instantTranslation(Translations.rotation[this.part].all),
      align: "center",
      style: {
        fontSize: "16px"
      }
    }
    this.yAxis = {}
    this.dataLabels = {enabled: false}
    this.markers = {size: 0}
    this.legend = {
      position: "top"
    }
    this.tooltip = {
      y: {
        formatter(val: number, opts?: any): string {
          const degree =  ((Math.acos(val)) * (180/Math.PI)).toFixed(2)
          return `± ${degree}°`
        }
      }
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.records) {
      this.prepareData();
      await this.setChartData();
    }
  }

  private degreeToRadian(degree: number): number {
    return degree * Math.PI / 180;
  }

  private prepareData() {
    this.rotation_x = [];
    this.rotation_y = [];
    this.rotation_z = [];
    this.events = [];
    let tick = 0;
    for (const record of this.records) {
      this.rotation_x.push({x: tick, y: Math.cos(this.degreeToRadian(record[this.part].rotation.x)).toFixed(2)});
      this.rotation_y.push({x: tick, y: Math.cos(this.degreeToRadian(record[this.part].rotation.y)).toFixed(2)});
      this.rotation_z.push({x: tick, y: Math.cos(this.degreeToRadian(record[this.part].rotation.z)).toFixed(2)});

      if (record.event){
        this.events.push(ChartUtil.createEvent(tick, this.titleCasePipe.transform(this.translateService.instantTranslation(Translations.event))));
      }

      tick++
    }
  }

  private async setChartData() {
    const setting: MultipleAxisGraph = this.graphSetting as MultipleAxisGraph;
    const series: ApexAxisChartSeries = [];

    if (setting.axis.x && setting.axis.x === true) {
      series.push({
        name: this.translateService.instantTranslation(Translations.axis.x),
        data: this.rotation_x,
        color: "#E9142D"
      })
    }

    if (setting.axis.y && setting.axis.y === true) {
      series.push({
        name: this.translateService.instantTranslation(Translations.axis.y),
        data: this.rotation_y,
        color: "#63E617"
      })
    }

    if (setting.axis.z && setting.axis.z === true) {
      series.push({
        name: this.translateService.instantTranslation(Translations.axis.z),
        data: this.rotation_z,
        color: "#006AA7"
      })
    }

    this.series = series
    this.annotations = {
      xaxis: this.events
    }
  }
}
