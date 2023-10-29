import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Record } from "../../../models/activity.model";
import { ChartConfiguration } from "chart.js";

@Component({
  selector: 'app-rotation-polar-chart',
  templateUrl: './rotation-polar-chart.component.html',
  styleUrls: ['./rotation-polar-chart.component.scss']
})
export class RotationPolarChartComponent implements OnChanges {

  @Input({required: true, alias: "part"}) part: "head" | "left_hand" | "right_hand";
  @Input({required: true}) records: Record[];
  @Input({required: true}) axis: "x" | "y" | "z";

  lineChartData: ChartConfiguration['data'] = null;
  lineChartOptions: ChartConfiguration['options'] = null;
  rotation = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.records) {
      this.prepareData();
      this.setChartData();
      this.setChartOptions();
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

    this.rotation = this.rotation.map(r => r / this.records.length * 100);
  }


  private setChartData() {
    const labels = ["315-360", "270-315", "225-270", "180-225", "135-180", "90-135", "45-90", "0-45"]


    const datasets = [
      {
        data: this.rotation,
        label: "Rotation",
        borderColor: "transparent",
        backgroundColor: ["#FF96A3", "#FFC78E", "#EAA928", "#FFDF9F", "#BDFF96", "#77FFE4", "#77F6FF", "#73CCFF"]
      }
    ];

    this.lineChartData = {
      datasets: datasets,
      labels: labels
    };
  }

  setChartOptions() {
    this.lineChartOptions = {}
  }

}
