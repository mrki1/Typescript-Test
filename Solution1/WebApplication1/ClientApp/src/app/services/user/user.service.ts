import { Injectable } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TreevItem, WorkingHours, ChartInfo } from '../../models/models';
import 'rxjs/add/operator/map';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class UserService {

  constructor(private http: HttpClient) { }

  retList: TreeviewItem[] = [];
  
  getBooks(): TreeviewItem[] {

    
    const childrenCategory = new TreeviewItem({ 
      text: 'Children', value: 1, collapsed: false, children: [

        { text: 'Baby 3-5', value: 11 },

        { text: 'Baby 6-8', value: 12 },

        { text: 'Baby 9-12', value: 13 }

      ] 
    });

    const itCategory = new TreeviewItem({ 
      text: 'IT', value: 9, collapsed: false, children: [ 
        { 
          text: 'Programming', value: 91, children: [{ 
            text: 'Frontend', value: 911, children: [ 
              { text: 'Angular 1', value: 9111 }, 
              { text: 'Angular 2', value: 9112 }, 
              { text: 'ReactJS', value: 9113 } 
            ] 
          }, { 
              text: 'Backend', value: 912, children: [ 
              { text: 'C#', value: 9121 }, 
              { text: 'Java', value: 9122 }, 
              { text: 'Python', value: 9123 } 
            ] 
          }] 
        }, 
        { 
          text: 'Networking', value: 92, children: [ 
            { text: 'Internet', value: 921 }, 
            { text: 'Security', value: 922 } 
          ] 
        } 
      ]

    });

    const teenCategory = new TreeviewItem({ 
      text: 'Teen', value: 2, collapsed: false, children: [ 
        { text: 'Adventure', value: 21 }, 
        { text: 'Science', value: 22 } 
      ] 
    });

    const othersCategory = new TreeviewItem({ text: 'Others', value: 3, collapsed: false });

    return [childrenCategory, itCategory, teenCategory, othersCategory];
    
  }

  processChildren(main: TreeviewItem, old: TreevItem) {

    var children: TreeviewItem[];
    let child: TreeviewItem;

    if (old.children != null) {
      children = new Array();
      for (var j = 0; j < old.children.length; j++) {
        child = new TreeviewItem({ text: old.children[j].text, value: old.children[j].value, checked: false });
        children.push(child);

        this.processChildren(child, old.children[j]);
      }
      main.children = children;
    }
  }

  getTreeviewData(): Observable<TreeviewItem[]> {

    //return Observable.of( this.getBooks());

    return this.http.get<TreevItem[]>('/api/User/GetTreeviewData')
      .map((res: TreevItem[]) => {
        let items: TreeviewItem[];
        let children: TreeviewItem[];
        let item: TreeviewItem;
        let child: TreeviewItem;

        //console.log(res.length);
        //console.log(res);

        items = new Array();

        for (var i = 0; i < res.length; i++) {
          item = new TreeviewItem({
            text: res[i].text, value: res[i].value, checked: false
          });
          if (res[i].children != null) {
            children = new Array();
            for (var j = 0; j < res[i].children.length; j++) {
              child = new TreeviewItem({ text: res[i].children[j].text, value: res[i].children[j].value, checked: false });
              children.push(child);

              this.processChildren(child, res[i].children[j]);
            }
            item.children = children;
          }
          items.push(item);
        }

        //console.log(items);

        return items;
      });
  }

  getSelectedData(srch: ChartInfo): Observable<WorkingHours> {
    console.log("srch");
    console.log(srch);
    return this.http.post<WorkingHours>('/api/User/GetSelectedData', srch)
      .map((res: any) => {
        console.log("res");
        console.log(res);
        return res;
        //return res.json() as WorkingHours;
      });
  }
}
