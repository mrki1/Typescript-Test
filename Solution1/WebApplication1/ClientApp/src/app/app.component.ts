import { Component, Renderer2, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { BarChartComponent } from './charts/chart.component';
import { CommService } from "./services/communication/communication.service";
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { BookmarkService } from "./services/bookmark/bookmark.service";
import { Bookmark, BookmarkContent, ChartInfo } from './models/models';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  chartList = new Array;
  bookmarkList: Bookmark[] = new Array();
  bookSaveBtnName = "Add New";
  selectedBookmark;
  selectedBookmarkName = "";
  bookmarkName = "";
  tab_id = 1;
  subscription: Subscription;
  countryList = new Array();
  selectedCountry = "";
  bookmark: Bookmark;
  bookmarkContent: BookmarkContent;
  chartInfo: ChartInfo;

  constructor(private comm: CommService, private _translate: TranslateService, private bookmservice: BookmarkService) {
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
      if (this.bookmarkList[i].Bname === this.selectedBookmark.Bname) {
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
      if (this.bookmarkList[i].Bname === this.selectedBookmark.Bname) {
        this.bookmarkList[i].Bname = this.bookmarkName;
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

      this.bookmarkContent = new BookmarkContent();
      this.bookmarkContent.charts = new Array();
      for (var i = 0; i < this.chartList.length; i++) {
        this.bookmarkContent.charts.push(this.chartList[i].chartInfo);
      }

      this.bookmark = new Bookmark();
      this.bookmark.Bname = this.bookmarkName;
      this.bookmark.Bcontent = JSON.stringify(this.bookmarkContent);

      this.bookmservice.createBookmark(this.bookmark).subscribe(
        data => { this.bookmarkList = data;
          this.bookmarkList.push(this.bookmark);
          this.selectedBookmark = this.bookmark;
          this.selectedBookmarkName = this.bookmarkName;},
        err => console.error(err),
        () => { console.log('done saving bookmark') }
      );
    }
  }

  changeBookmark(value) {
    this.bookmarkName = value;
    for (var i = 0; i < this.bookmarkList.length; i++) {
      if (this.bookmarkList[i].bname === value) {
        this.selectedBookmark = this.bookmarkList[i];
        break;
      }
    }
    this.selectedBookmarkName = value;

    this.bookmarkContent = JSON.parse(this.selectedBookmark.bcontent);

    this.chartList = new Array;

    var timestamp;

    for (var i = 0; i < this.bookmarkContent.charts.length; i++) {
      timestamp = new Date().getUTCMilliseconds();
      this.chartList.push({ text: this.bookmarkContent.charts[i].chartName, id: timestamp, chartInfo: this.bookmarkContent.charts[i] });
    }
  }

  ngOnInit() {
    this.chartInfo = new ChartInfo();

    this.subscription = this.comm.setTabChanged().subscribe(val => {
      this.tab_id = val;
    });

    this.countryList.push({ text: "English", code: "en" }, { text: "Croatian", code: "hr" });

    this.bookmservice.getAllBookmarks().subscribe(
      data => { this.bookmarkList = data },
      err => console.error(err),
      () => { console.log('done loading bookmarks') }
    );
  }

  addNewChart() {
    var timestamp = new Date().getUTCMilliseconds(); 
    this.chartList.push({ text : "", id : timestamp, chartInfo : null});
  }
}
