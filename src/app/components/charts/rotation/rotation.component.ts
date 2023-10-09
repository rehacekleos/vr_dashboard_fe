import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from "chart.js";
import { Record } from "../../../models/activity.model";

@Component({
  selector: 'app-rotation-chart',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss']
})
export class RotationComponent implements OnInit{

  @Input({required: true, alias: "part"}) part: "head" | "left_hand" | "right_hand";
  @Input({required: true}) records: Record[];
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;
  @Input() zAxisTitle: string;


  lineChartData: ChartConfiguration['data'] = null;
  lineChartOptions: ChartConfiguration['options'] = null;

  rotation_x = [];
  rotation_y = [];
  rotation_z = [];

  ngOnInit(): void {
    this.prepareData();
    this.setChartData();
    this.setChartOptions();
  }

  private prepareData(){
    for (const record of this.records) {
      this.rotation_x.push({x: record.tick, y: record[this.part].rotation.x});
      this.rotation_y.push({x: record.tick, y: record[this.part].rotation.y});
      this.rotation_z.push({x: record.tick, y: record[this.part].rotation.z});
    }
  }

  private setChartData() {
    const datasets = [];

    if (this.xAxisTitle && this.xAxisTitle !== ""){
      datasets.push({
        type: "line",
        data: this.rotation_x,
        label: this.xAxisTitle,
        backgroundColor: 'transparent',
        fill: 'origin',
      })
    }

    if (this.yAxisTitle && this.yAxisTitle !== ""){
      datasets.push({
        type: "line",
        data: this.rotation_y,
        label: this.yAxisTitle,
        backgroundColor: 'transparent',
        fill: 'origin',
      })
    }

    if (this.zAxisTitle && this.zAxisTitle !== ""){
      datasets.push({
        type: "line",
        data: this.rotation_z,
        label: this.zAxisTitle,
        backgroundColor: 'transparent',
        fill: 'origin',
      })
    }

    this.lineChartData = {
      datasets: datasets
    };
  }

  setChartOptions() {
    this.lineChartOptions = {
      animation: false,
      parsing: false,
      plugins: {
        decimation: {
          enabled: true,
          algorithm: "lttb",
          samples: 20,
          threshold: 50
        }
      },
      scales: {
        x:{
          type: "linear",
          min: 0,
          max: this.records.length
        },
        y: {
          min: 0,
          max: 365
        }
      }
    }
  }


}
