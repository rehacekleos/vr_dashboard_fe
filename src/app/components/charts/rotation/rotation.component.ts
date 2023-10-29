import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartDataset } from "chart.js";
import { Record } from "../../../models/activity.model";

@Component({
  selector: 'app-rotation-chart',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss']
})
export class RotationComponent implements OnInit, OnChanges{

  @Input({required: true, alias: "part"}) part: "head" | "left_hand" | "right_hand";
  @Input({required: true}) records: Record[];
  @Input({required: true}) xAxisTitle: string;
  @Input({required: true}) yAxisTitle: string;
  @Input({required: true}) zAxisTitle: string;
  @Input({required: true}) eventsTitle: string;

  lineChartData: ChartConfiguration['data'] = null;
  lineChartOptions: ChartConfiguration['options'] = null;

  rotation_x = [];
  rotation_y = [];
  rotation_z = [];
  events = [];

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.records){
      this.prepareData();
      this.setChartData();
      this.setChartOptions();
    }
  }

  private degreeToRadian(degree: number): number{
    return degree * Math.PI / 180;
  }

  private prepareData(){
    this.rotation_x = [];
    this.rotation_y = [];
    this.rotation_z = [];
    this.events = [];
    let tick = 0;
    for (const record of this.records) {
      this.rotation_x.push({x: tick, y: Math.cos(this.degreeToRadian(record[this.part].rotation.x))});
      this.rotation_y.push({x: tick, y: Math.cos(this.degreeToRadian(record[this.part].rotation.y))});
      this.rotation_z.push({x: tick, y: Math.cos(this.degreeToRadian(record[this.part].rotation.z))});
      if (record.event){
        this.events.push([-1.2, 1.2]);
      } else {
        this.events.push(null);
      }
      tick++
    }
  }

  private setChartData() {
    const datasets: ChartDataset[] = [];

    if (this.xAxisTitle && this.xAxisTitle !== ""){
      datasets.push({
        type: "line",
        data: this.rotation_x,
        label: this.xAxisTitle,
        fill: false,
        backgroundColor: "#E9142D",
        borderColor: "#E9142D",
        pointBackgroundColor: "#E9142D",
        pointBorderWidth: 0,
        order: 1
      })
    }

    if (this.yAxisTitle && this.yAxisTitle !== ""){
      datasets.push({
        type: "line",
        data: this.rotation_y,
        label: this.yAxisTitle,
        fill: false,
        backgroundColor: "#63E617",
        borderColor: "#63E617",
        pointBackgroundColor: "#63E617",
        pointBorderWidth: 0,
        order: 2
      })
    }

    if (this.zAxisTitle && this.zAxisTitle !== ""){
      datasets.push({
        type: "line",
        data: this.rotation_z,
        label: this.zAxisTitle,
        fill: false,
        backgroundColor: "#006AA7",
        borderColor: "#006AA7",
        pointBackgroundColor: "#006AA7",
        pointBorderWidth: 0,
        order: 3
      })
    }

    datasets.push({
      type: "bar",
      data: this.events,
      label: this.eventsTitle,
      backgroundColor: "#000",
      borderColor: "#000",
      hoverBorderWidth: 2,
      barThickness: 2,
      order: 0
    })

    this.lineChartData = {
      labels: Array.from(Array(this.records.length).keys()),
      datasets: datasets
    };
  }

  setChartOptions() {
    this.lineChartOptions = {
      scales:{
        y:{
          min: -1.2,
          max: 1.2
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }

}
