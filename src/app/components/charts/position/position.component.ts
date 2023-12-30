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
import { ApplicationSetting } from "../../../models/application.model";
import { TitleCasePipe } from "@angular/common";
import { GraphSetting, PositionGraph, PositionHeatMapGraph } from "../../../models/graph.model";

@Component({
  selector: 'app-position-chart',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent extends TranslateComponent implements OnInit, OnChanges{

  @Input({required: true, alias: "part"}) part: "head" | "left_hand" | "right_hand";
  @Input({required: true}) records: Record[];
  @Input({required: true}) appSetting: ApplicationSetting
  @Input({required: true}) graphSetting: GraphSetting

  position = [];

  series: ApexAxisChartSeries;
  chart: ApexChart = {
    type: "line",
    height: ChartUtil.CHART_HEIGHT,
    zoom: {
      type: "x",
      enabled: true,
      autoScaleYaxis: true
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
  yAxis: ApexYAxis;
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

  ngOnInit(): void {
    const timeTranslate = this.titleCasePipe.transform(this.translateService.instantTranslation(Translations.time));
    const setting: PositionGraph = this.graphSetting as PositionGraph;

    this.tooltip = {
      y: {
        title:{
          formatter(seriesName: string): string {
            return timeTranslate + ":";
          }
        },
        formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
          return dataPointIndex.toString()
        }
      }
    }

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
      type: "numeric",
      title: {
        text: this.translateService.instantTranslation(Translations.axis.z) + (setting.x_axis_unit ? ` [${setting.x_axis_unit}]` : "")
      }
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
