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
import { ApplicationSetting } from "../../../models/application.model";

/**
 * Rotation Polar Graph <br>
 * It visualize rotation as Polar graph (circle) of selected part in selected axis
 *
 * @example
 * <app-rotation-polar-chart
 *   [part]="graph.part"
 *   [records]="environmentsRecords"
 *   [axis]="graph.axis"
 *   [appSetting]="application.setting"
 * />
 */
@Component({
  selector: 'app-rotation-polar-chart',
  templateUrl: './rotation-polar-chart.component.html',
  styleUrls: ['./rotation-polar-chart.component.scss']
})
export class RotationPolarChartComponent extends TranslateComponent implements OnInit, OnChanges {

  @Input({required: true, alias: "part"}) part: GraphPart;
  @Input({required: true}) records: Record[];
  @Input({required: true}) axis: Axis;
  @Input({required: true}) appSetting: ApplicationSetting

  rotation = [];

  series: ApexAxisChartSeries;
  chart: ApexChart = {
    type: "polarArea",
    height: ChartUtil.CHART_HEIGHT,
    animations: {
      enabled: false
    }
  };
  dataLabels: ApexDataLabels = {enabled: false};
  markers: ApexMarkers = {size: 0};
  title: ApexTitleSubtitle;
  fill: ApexFill = {
    opacity: 1
  };
  yAxis: ApexYAxis = {
    show: false
  };
  xAxis: ApexXAxis = {
    type: "numeric",
  };
  legend: ApexLegend = {
    position: "top"
  };
  annotations: ApexAnnotations;
  tooltip: ApexTooltip = {
    y: {
      formatter(val: number, opts?: any): string {
        return val + "%"
      }
    }
  };
  labels: string[] = ["315-360°", "270-315°", "225-270°", "180-225°", "135-180°", "90-135°", "45-90°", "0-45°"];
  plotOptions: ApexPlotOptions = {
    polarArea: {
      rings: {
        strokeWidth: 0
      }
    }
  };
  stroke: ApexStroke = {
    width: 1,
    colors: undefined
  };

  constructor(private translateService: CustomTranslateService) {
    super();
  }

  ngOnInit() {
    this.title = {
      text: this.translateService.instantTranslation(Translations.rotation[this.part].all),
      align: "center",
      style: {
        fontSize: "16px"
      }
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
