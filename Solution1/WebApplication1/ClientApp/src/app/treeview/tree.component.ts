import { Component, ElementRef, Renderer2 } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { UserService } from '../services/user/user.service';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
})

export class TreeComponent {
  dropdownEnabled = true;
  items: TreeviewItem[];
  item: TreeviewItem;
  values: number[];
  searchParams;

  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: window.innerHeight
  });

  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ];

  buttonClass = this.buttonClasses[0];

  constructor(
    private service: UserService, private elRef: ElementRef, private rnd: Renderer2
  ) { }

  processChildren(children) {
    for (var i = children.length - 1; i >= 0; i--) {
      if (children[i] != null) {
        //console.log(children[i].checked);
        if (children[i].checked == undefined) {
          if (children[i].children != null) {
            this.processChildren(children[i].children);
          }
        } else if (children[i].checked) {
          if (children[i].children != null) {
            children[i].children = null;
          }
        } else {
          children.splice(i, 1);
        }
      }
    }
  }

  ngOnInit() {

    this.service.getTreeviewData().subscribe(
      data => { this.items = data },
      err => console.error(err),
      () => { console.log('done loading users') }
    );

    this.searchParams = cloneDeep(this.items);

    this.rnd.listen(document, 'contextmenu', (event) => {
      var found = false;
      var i;
      for (i = 0; i < event.path.length; i++) {
        if (event.path[i].tagName == "NGX-TREEVIEW") {
          found = true;
          break;
        }
      }
     
      if (found && event.srcElement.className == 'form-check-label') {
        console.log(event);
        event.stopPropagation();
        event.preventDefault();
        var cantThinkOfAName = document.getElementById("rightclicked");
        cantThinkOfAName.style.display = "block";
        cantThinkOfAName.style.left = event.clientX + "px";
        cantThinkOfAName.style.top = event.clientY + "px"; 
      }
      //console.log(event);
    });
  }

  selectedChange(values) {
    console.log(values);
  }

  onSelectionChange($event) {
    //console.log(this.values);
    this.values = $event;
    //console.log(this.values);

    //console.log(this.items);
    //console.log(clonedObject);
    this.searchParams = cloneDeep(this.items);

    for (var i = this.searchParams.length - 1; i >= 0; i--) {
        if (this.searchParams[i] != null) {
          //console.log(this.clonedObject[i].checked);
          if (this.searchParams[i].checked == undefined) {
            if (this.searchParams[i].children != null) {
              this.processChildren(this.searchParams[i].children);
            }
          } else if (this.searchParams[i].checked) {
            if (this.searchParams[i].children != null) {
              this.searchParams[i].children = null;
            }
          } else {
            this.searchParams.splice(i, 1);
          }
        }
    }
  }

  onFilterChange(value: string) { 
    console.log('filter:', value); 
  }

  getData() {
    console.log("search:");
    console.log(this.searchParams);

    this.service.getSelectedData(this.searchParams).subscribe(
      data => { },
      err => console.error(err),
      () => { console.log('done loading hours') }
    );
  }
}
