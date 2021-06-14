import { Component, OnInit } from "@angular/core";
declare var $: any;
@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
})
export class NewsComponent implements OnInit {
  newsinformation = {
    news_ID: 0,
    news_DATE: "",
    news_Desc: "",
    news_Auther: "",
    news_Title: "",
    isactive: true,
  };
  constructor() {}

  ngOnInit() {}
  AddNew() {
    $("#addModal").modal("show");
  }
  Edit(row) {
    console.log(row);

    $("#editModal").modal("show");
  }
  Delete() {}

  add() {}
  update() {}
}
