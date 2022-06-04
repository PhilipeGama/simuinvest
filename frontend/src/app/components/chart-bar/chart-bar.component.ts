import { Component, Input, OnInit, ViewChild, OnChanges } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss'],
})
export class ChartBarComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;

  @Input() chartDataMockup: any;
 


  categories = [
    "Inicio",
    "Fim",
  ]

  poupanca: number[] = [];

  constructor() {
  }


  ngOnInit(): void {
    
    this.createChartLineBar()
  }
  
  createChartLineBar(){

    this.chartOptions = {
      series: [
        {
          name: this.chartDataMockup[0].fixedIncome,
          data: [this.chartDataMockup[0].initialValue, this.chartDataMockup[0].amount]
        },
        {
          name: this.chartDataMockup[1].fixedIncome,
          data: [this.chartDataMockup[1].initialValue, this.chartDataMockup[1].amount]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: `Redimento de ${this.chartDataMockup[1].fixedIncome} em relação a  ${this.chartDataMockup[0].fixedIncome} `,
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.categories
      }
    };
  }


  loadChart(){
    let initialValue = this.chartDataMockup.initialValue - (this.chartDataMockup.initialValue * 0.20);
    let amount = this.chartDataMockup.amount - (this.chartDataMockup.amount * 0.20);
    
    initialValue = parseFloat(initialValue.toFixed(2));
    amount = parseFloat(amount.toFixed(2));


    let valuesMockup = [initialValue, amount]

    valuesMockup.map((value: number) => {
      this.poupanca.push(value)
    })

    this.createChartLineBar();
  }





}
