import { Component, Renderer2, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { BarChartComponent } from './charts/chart.component';
import { CommService } from "./services/communication/communication.service";
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  chartList = new Array;
  bookmarkList = [];
  bookSaveBtnName = "Add New";
  selectedBookmark;
  selectedBookmarkName = "";
  bookmarkName = "";
  tab_id = 1;
  subscription: Subscription;
  countryList = new Array();
  selectedCountry = "";

  constructor(private comm: CommService, private _translate: TranslateService) {
    this._translate.setDefaultLang('hr');
    this._translate.use('hr');
    this.selectedCountry = "hr";
  }

  changeCountry(val) {
    this._translate.setDefaultLang(val);
    this._translate.use(val);
  }

  deleteBookMark() {
    for (var i = 0; i < this.bookmarkList.length; i++) {
      if (this.bookmarkList[i].text === this.selectedBookmark.text) {
        this.bookmarkList.splice(i, 1);
        break;
      }
    }

    this.selectedBookmark = null;
    this.selectedBookmarkName = "";
    this.bookmarkName = "";
  }

  updateBookMark() {
    if (this.bookmarkName === "") {
      alert("Please fill some name!");
      return;
    }

    //http

    console.log(this.selectedBookmark.text);
    console.log(this.bookmarkName);
    console.log(this.bookmarkName);

    for (var i = 0; i < this.bookmarkList.length; i++) {
      if (this.bookmarkList[i].text === this.selectedBookmark.text) {
        this.bookmarkList[i].text = this.bookmarkName;
        console.log("op");
        break;
      }
    }

    this.selectedBookmarkName = this.bookmarkName;
  }

  addNewBookMark() {
    if (this.bookSaveBtnName === "Add New") {
      if (this.bookmarkName === "") {
        alert("Please fill some name!");
        return;
      }
     
        //if (this.bookmarkList.find(a => (a.text === this.bookmarkName))) {
          //alert("Name allready exists!");
         // return;
        //}

        //http

        this.bookmarkList.push({ text: this.bookmarkName });
        this.selectedBookmark = { text: this.bookmarkName };
      this.selectedBookmarkName = this.bookmarkName;
    }
  }

  changeBookmark(value) {
    this.bookmarkName = value;
    this.selectedBookmark = { text: value };
    this.selectedBookmarkName = value;
  }

  ngOnInit() {
    //this.chartList.push(1);
    this.subscription = this.comm.setTabChanged().subscribe(val => {
      this.tab_id = val;
    });

    this.countryList.push({ text: "English", code: "en" }, { text: "Croatian", code: "hr" })
  }

  addNewChart() {
    var timestamp = new Date().getUTCMilliseconds();
    this.chartList.push({ text : "", id : timestamp});
  }
}
