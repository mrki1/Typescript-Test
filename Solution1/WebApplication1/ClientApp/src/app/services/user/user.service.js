"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ngx_treeview_1 = require("ngx-treeview");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
};
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.retList = [];
    }
    UserService.prototype.getBooks = function () {
        var childrenCategory = new ngx_treeview_1.TreeviewItem({
            text: 'Children', value: 1, collapsed: false, children: [
                { text: 'Baby 3-5', value: 11 },
                { text: 'Baby 6-8', value: 12 },
                { text: 'Baby 9-12', value: 13 }
            ]
        });
        var itCategory = new ngx_treeview_1.TreeviewItem({
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
        var teenCategory = new ngx_treeview_1.TreeviewItem({
            text: 'Teen', value: 2, collapsed: false, children: [
                { text: 'Adventure', value: 21 },
                { text: 'Science', value: 22 }
            ]
        });
        var othersCategory = new ngx_treeview_1.TreeviewItem({ text: 'Others', value: 3, collapsed: false });
        return [childrenCategory, itCategory, teenCategory, othersCategory];
    };
    UserService.prototype.processChildren = function (main, old) {
        var children;
        var child;
        if (old.children != null) {
            children = new Array();
            for (var j = 0; j < old.children.length; j++) {
                child = new ngx_treeview_1.TreeviewItem({ text: old.children[j].text, value: old.children[j].value, checked: false });
                children.push(child);
                this.processChildren(child, old.children[j]);
            }
            main.children = children;
        }
    };
    UserService.prototype.getTreeviewData = function () {
        //return Observable.of( this.getBooks());
        var _this = this;
        return this.http.get('/api/User/GetTreeviewData')
            .map(function (res) {
            var items;
            var children;
            var item;
            var child;
            //console.log(res.length);
            //console.log(res);
            items = new Array();
            for (var i = 0; i < res.length; i++) {
                item = new ngx_treeview_1.TreeviewItem({
                    text: res[i].text, value: res[i].value, checked: false
                });
                if (res[i].children != null) {
                    children = new Array();
                    for (var j = 0; j < res[i].children.length; j++) {
                        child = new ngx_treeview_1.TreeviewItem({ text: res[i].children[j].text, value: res[i].children[j].value, checked: false });
                        children.push(child);
                        _this.processChildren(child, res[i].children[j]);
                    }
                    item.children = children;
                }
                items.push(item);
            }
            //console.log(items);
            return items;
        });
    };
    UserService.prototype.getSelectedData = function (srch) {
        console.log("srch");
        console.log(srch);
        return this.http.post('/api/User/GetSelectedData', srch)
            .map(function (res) {
            console.log("res");
            console.log(res);
            return res;
            //return res.json() as WorkingHours;
        });
    };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map