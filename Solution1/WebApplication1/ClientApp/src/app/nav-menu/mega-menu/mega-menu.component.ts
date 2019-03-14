import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { CommService } from "../../services/communication/communication.service";

@Component({
  selector: 'mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.css']
})
export class MegaMenuComponent {

  selectedMenu = 1;

  changeMenu(val) {
    this.selectedMenu = val;
    this.comm.tabChanged(val);
  }

  constructor( 
    private service: UserService, private comm: CommService 
  ) { }

  ngOnInit() {  
  }

  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

}
