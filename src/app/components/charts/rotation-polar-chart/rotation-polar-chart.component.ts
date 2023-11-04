import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Record } from "../../../models/activity.model";
import { Axis, GraphPart } from "../../../models/graph.model";
import {
  ApexAnnotations,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexMarkers, ApexPlotOptions, ApexStroke,
  ApexTitleSubtitle, ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from "ng-apexcharts";
import { ChartUtil } from "../../../shared/utils/chartUtil";
import { Translations } from "../../../shared/translate/translate.model";
import { CustomTranslateService } from "../../../shared/translate/services/custom-translate.service";
import { TranslateComponent } from "../../../shared/translate/translate.component";

@Component({
  selector: 'app-rotation-polar-chart',
  templateUrl: './rotation-polar-chart.component.html',
  styleUrls: ['./rotation-polar-chart.component.scss']
})
export class RotationPolarChartComponent extends TranslateComponent implements OnInit, OnChanges {

  @Input({required: true, alias: "part"}) part: GraphPart;
  @Input({required: true}) records: Record[];
  @Input({required: true}) axis: Axis;

  rotation = [];

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
  labels: string[];
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;

  constructor(private translateService: CustomTranslateService) {
    super();
  }

  ngOnInit() {
    this.chart = {
      type: "polarArea",
      height: ChartUtil.CHART_HEIGHT,
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
    this.yAxis = {
      show: false
    }
    this.dataLabels = {enabled: false}
    this.markers = {size: 0}
    this.legend = {
      position: "top"
    }
    this.tooltip = {
      y: {
        formatter(val: number, opts?: any): string {
          return val + "%"
        }
      }
    }
    this.labels = ["315-360°", "270-315°", "225-270°", "180-225°", "135-180°", "90-135°", "45-90°", "0-45°"]
    this.plotOptions = {
      polarArea: {
        rings: {
          strokeWidth: 0
        }
      }
    }
    this.fill = {
      opacity: 1
    }
    this.stroke = {
      width: 1,
      colors: undefined
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.records) {
      this.prepareData();
      this.setChartData();
    }
  }

  private prepareData() {
    this.rotation = [0, 0, 0, 0, 0, 0, 0, 0];

    for (const record of this.records) {
      const rotation = record[this.part].rotation[this.axis];

      switch (true) {
        case rotation < 45:
          this.rotation[7] = this.rotation[7] + 1;
          break;
        case rotation < 90:
          this.rotation[6] = this.rotation[6] + 1;
          break;
        case rotation < 135:
          this.rotation[5] = this.rotation[5] + 1;
          break;
        case rotation < 180:
          this.rotation[4] = this.rotation[4] + 1;
          break;
        case rotation < 225:
          this.rotation[3] = this.rotation[3] + 1;
          break;
        case rotation < 270:
          this.rotation[2] = this.rotation[2] + 1;
          break;
        case rotation < 315:
          this.rotation[1] = this.rotation[1] + 1;
          break;
        default:
          this.rotation[0] = this.rotation[0] + 1;
          break;
      }

    }

    this.rotation = this.rotation.map(r => (r / this.records.length * 100).toFixed(2));
  }


  private setChartData() {
    this.series = this.rotation
  }

}
