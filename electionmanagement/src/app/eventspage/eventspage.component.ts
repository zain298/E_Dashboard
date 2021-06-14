import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { OnFailService } from "../services/on-fail.service";
import { EventspageService } from "./eventspage.service";

@Component({
  selector: "app-eventspage",
  templateUrl: "./eventspage.component.html",
  styleUrls: ["./eventspage.component.css"],
})
export class EventspageComponent implements OnInit {
  constructor(
    private eventspageservice: EventspageService,
    private onfailservice: OnFailService,
    private toastrservice: ToastrService
  ) {}

  ngOnInit() {}
}
