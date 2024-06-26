import { TreeviewItem } from 'ngx-treeview'

export class TreevItem {
  text: string;
  value: any;
  children: TreevItem[];
}

export class Hours {
  data: Array<number>;
  label: string;
}

export class WorkingHours {
  hourList: Hours[];
  chartLabels: string[];
}

export class ChartInfo {
  searchValue: TreeviewItem[]
  chartGrouping: string[]
  chartName: string
}

export class Bookmark {
  Bname: string
  Bcontent:string
}

export class BookmarkContent {
  charts: ChartInfo[]
}
