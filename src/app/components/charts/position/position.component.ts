import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Record } from "../../../models/activity.model";
import { CustomTranslateService } from "../../../shared/translate/services/custom-translate.service";
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { Translations } from "../../../shared/translate/translate.model";
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

@Component({
  selector: 'app-position-chart',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent extends TranslateComponent implements OnInit, OnChanges{

  @Input({required: true, alias: "part"}) part: "head" | "left_hand" | "right_hand";
  @Input({required: true}) records: Record[];

  position = [];

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

  constructor(private translateService: CustomTranslateService) {
    super();
  }

  ngOnInit(): void {
    this.chart = {
      type: "line",
      height: ChartUtil.CHART_HEIGHT,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      },
      animations: {
        enabled: false
      }
    }
    this.title = {
      text: this.translateService.instantTranslation(Translations.position[this.part].all),
      align: "center",
      style: {
        fontSize: "16px"
      }
    }
    this.xAxis = {
      type: "numeric",
      title: {
        text: this.translateService.instantTranslation(Translations.axis.z)
      }
    }
    this.yAxis = {
      title: {
        text: this.translateService.instantTranslation(Translations.axis.x)
      }
    }
    this.dataLabels = {enabled: false}
    this.markers = {size: 0}
    this.legend = {
      position: "top"
    }
    this.tooltip = {
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.records){
      this.prepareData();
      this.setChartData();
    }
  }

  private prepareData(){
    this.position = [];

    for (const record of this.records) {
      this.position.push({x: record[this.part].position.z, y: record[this.part].position.x});
    }
  }

  private setChartData() {
    const series: ApexAxisChartSeries = [];

    series.push({
      name: this.translateService.instantTranslation(Translations.position[this.part].all),
      data: this.position,
      color: "#006AA7"
    })

    this.series = series;
  }

}
