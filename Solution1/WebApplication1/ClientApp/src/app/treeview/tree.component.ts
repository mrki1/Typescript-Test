import { Component, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { UserService } from '../services/user/user.service';
import * as cloneDeep from 'lodash/cloneDeep';
import { Globals } from '../globals/globals';
import { CommService } from "../services/communication/communication.service";

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
})

export class TreeComponent {
  dropdownEnabled = true;
  items: TreeviewItem[];
  item: TreeviewItem;
  values: number[];
  searchParams: TreeviewItem[];
  @Output() updateView1 = new EventEmitter<any>();

  constructor(
    private service: UserService, private rnd: Renderer2, private globals: Globals, private comm: CommService
  ) { }

  getData() {
    this.comm.sendDataCall();
  }

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

  processChildren(children) {
    for (var i = children.length - 1; i >= 0; i--) {
      if (children[i] != null) {
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
    this.globals.searchParams = this.searchParams;

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
    });
  }

  selectedChange(values) {
    console.log(values);
  }

  onSelectionChange($event) {

    this.values = $event;
    this.searchParams = cloneDeep(this.items);

    for (var i = this.searchParams.length - 1; i >= 0; i--) {
        if (this.searchParams[i] != null) {
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

    this.globals.searchParams = this.searchParams;
  }

  onFilterChange(value: string) { 
    console.log('filter:', value); 
  }
}
