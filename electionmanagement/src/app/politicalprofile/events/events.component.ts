import { Component, OnInit } from "@angular/core";
declare var $: any;
@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"],
})
export class EventsComponent implements OnInit {
  eventinformation = {
    event_ID: 0,
    event_DATE: "",
    event_Desc: "",
    event_Venue: "",
    event_Title: "",
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
