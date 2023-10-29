import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Record } from "../../../models/activity.model";
import { ChartConfiguration } from "chart.js";

@Component({
  selector: 'app-position-chart',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit, OnChanges{

  @Input({required: true, alias: "part"}) part: "head" | "left_hand" | "right_hand";
  @Input({required: true}) records: Record[];
  @Input({required: true}) title: string;


  lineChartData: ChartConfiguration['data'] = null;
  lineChartOptions: ChartConfiguration['options'] = null;

  position = [];

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.records){
      this.prepareData();
      this.setChartData();
      this.setChartOptions();
    }
  }

  private prepareData(){
    this.position = [];

    for (const record of this.records) {
      this.position.push({x: record[this.part].position.z, y: record[this.part].position.x});
    }
  }

  private setChartData() {
    const datasets = [];

    datasets.push({
      type: "line",
      data: this.position,
      label: this.title,
      backgroundColor: 'transparent',
      fill: 'origin',
    })

    this.lineChartData = {
      datasets: datasets
    };
  }

  setChartOptions() {
    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      parsing: false,
      plugins: {
        tooltip: {
          callbacks: {
            footer: (items) => {
              return "Time: " + items[0].dataIndex
            },
          }
        }
      },
      scales: {
        x:{
          type: "linear",
          min: Math.min(...this.position.map(p => p.x)),
          max: Math.max(...this.position.map(p => p.x))
        },
        y: {
          min: Math.min(...this.position.map(p => p.y)),
          max: Math.max(...this.position.map(p => p.y))
        }
      }
    }
  }

}
