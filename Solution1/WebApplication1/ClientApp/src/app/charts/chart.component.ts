import { Component, Input} from '@angular/core';
import { Globals } from '../globals/globals';
import { UserService } from '../services/user/user.service';
import { WorkingHours, ChartInfo } from '../models/models';
import { CommService } from "../services/communication/communication.service";
import { Subscription } from 'rxjs/Subscription';
import { TreeviewItem } from 'ngx-treeview';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})

export class BarChartComponent {

  public workingHours: WorkingHours;
  public chartLegend: boolean = true;
  public chartType: string = 'bar';
  searchParams: TreeviewItem[];
  subscription: Subscription;
  subscription1: Subscription;
  xAxis;
  yAxis;
  groupBy;
  xAxisList = new Array;
  yAxisList = new Array;
  groupByList = new Array;
  chartInfo: ChartInfo;
  chartEditBool = false;
  chartName = "";
  chartNameOld;
  @Input() chartList;
  @Input() chartItm;
  colapsedBool = false;

  toogleColapse() {
    this.colapsedBool = !this.colapsedBool;
  }

  startEdit() {
    this.chartNameOld = this.chartName;
    this.chartEditBool = true;
  }

  saveEdit() {
    if (this.chartName === "") {
      alert("Please fill some name!");
      return;
    }

    for (var i = 0; i < this.chartList.length; i++) {
      if (this.chartList[i].id === this.chartItm.id) {
        this.chartList[i].text = this.chartName;
        break;
      }
    }

    this.chartEditBool = false;
  }

  cancelEdit() {
    this.chartName = this.chartNameOld;
    this.chartEditBool = false;
  }

  deleteChart() {
    for (var i = 0; i < this.chartList.length; i++) {
      if (this.chartList[i].id === this.chartItm.id) {
        this.chartList.splice(i, 1);
        break;
      }
    }
  }

  changeXAxis(value) {

    let updateBool: boolean = true;

    if (value === this.groupBy || value === "" || this.groupBy === "") {
      return;
    }

    if (value === "Year" || value === "Month") {
      if (this.groupBy === "Year" || this.groupBy === "Month") {
        return;
      }
    }

    this.updateData();
  }

  changeGroupBy(value) {

    let updateBool: boolean = true;

    if (value === this.xAxis || value === "" || this.xAxis === "") {
      return;
    }

    if (value === "Year" || value === "Month") {
      if (this.xAxis === "Year" || this.xAxis === "Month") {
        return;
      }
    }

    this.updateData();
  }

  public chartOptions: any = {
    responsive: true,
    legend: {
      position: 'bottom'
    }
  };

  constructor(private globals: Globals, private service: UserService, private comm: CommService) {
  }

  ngOnInit() {

    this.chartNameOld = this.chartName;

    this.yAxisList.push({ "text": "Sum Of Hours", "value": "Sum" });
    this.xAxisList.push({ "text": "Month", "value": "Month" }, { "text": "Year", "value": "Year" }, { "text": "Country", "value": "CountryName" }, { "text": "Department", "value": "DepartmentName" });
    this.groupByList.push({ "text": "Month", "value": "Month" }, { "text": "Year", "value": "Year" }, { "text": "Country", "value": "CountryName" }, { "text": "Department", "value": "DepartmentName" });

    this.searchParams = this.globals.searchParams;
    this.chartInfo = new ChartInfo();
    this.yAxis = "Sum";
    this.xAxis = "";
    this.groupBy = "";

    if (this.chartItm.text != "") {
      this.searchParams = this.chartItm.chartInfo.searchValue;
      this.chartInfo = this.chartItm.chartInfo;
      this.xAxis = this.chartInfo.chartGrouping[0];
      this.groupBy = this.chartInfo.chartGrouping[1];
      this.chartName = this.chartInfo.chartName;
      this.updateData();
    }

    this.subscription = this.comm.getDataCall().subscribe(message => {
        this.updateData();
    });

    //this.updateData();
  }


  updateData() {

    this.workingHours = null;

    this.chartInfo.chartName = this.chartName;

    console.log(this.chartInfo);

    this.chartInfo.searchValue = this.searchParams;
    this.chartInfo.chartGrouping = [];
    if (this.yAxis != "Sum") {
      this.chartInfo.chartGrouping.push(this.yAxis);    // = [this.yAxis, this.xAxis];
    }
    if (this.groupBy != "Sum") {
      this.chartInfo.chartGrouping.push(this.groupBy);    // = [this.yAxis, this.xAxis];
    }
    if (this.xAxis != "Sum") {
      this.chartInfo.chartGrouping.push(this.xAxis);    // = [this.yAxis, this.xAxis];
    }

    this.service.getSelectedData(this.chartInfo).subscribe(
      data => { this.workingHours = data as WorkingHours},
      err => console.error(err),
      () => { console.log('done loading for chart') }
    );

    for (var i = 0; i < this.chartList.length; i++) {
      if (this.chartList[i].id === this.chartItm.id) {
        this.chartList[i].chartInfo = this.chartInfo;
        break;
      }
    }
  }
} 
