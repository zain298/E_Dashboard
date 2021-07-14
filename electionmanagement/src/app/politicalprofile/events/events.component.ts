import { ToastrService } from "ngx-toastr";
import { EventsService } from "./events.service";

import { HttpClient } from "@angular/common/http";
import { Http } from "@angular/http";
import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { stringify } from "@angular/core/src/util";
declare var $: any;
@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"],
})
export class EventsComponent implements OnInit {
  eventsformationAll = [];

  constructor(
    private httpClient: HttpClient,
    private eventsService: EventsService,
    private toastrservice: ToastrService,
    private datePipe: DatePipe
  ) {}
  selectedFile: File;
  eventinformation = {
    id: 0,
    title: "",
    description: "",
    venue: "",
    imageId: 0,
    date: "",
  };
  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit() {
    this.getAll();
  }

  AddNew() {
    this.eventinformation = {
      id: 0,
      title: "",
      description: "",
      venue: "",
      imageId: 0,
      date: "",
    };
    $("#addModal").modal("show");
  }
  Edit(row) {
    console.log(row);
    let date = this.datePipe.transform(new Date(row.date), "yyyy-MM-dd");

    this.eventinformation = {
      id: row.id,
      title: row.title,
      description: row.description,
      venue: row.venue,
      imageId: 0,
      date: date,
    };
    $("#editModal").modal("show");
  }
  Delete(id) {
    console.log("Deleted Id" + id);
    this.httpClient
      .delete("https://testing-spring-app.herokuapp.com/event/" + id)
      .subscribe((response) => {
        if (response == null) {
          console.log(response);
          this.toastrservice.success("Success");
          this.toastrservice.info("Event Deleted");
          this.getAll();
        }
      });
  }

  add(eventinformation) {
    $("#addModal").modal("hide");
    const uploadImageData = new FormData();
    uploadImageData.append(
      "imageFile",
      this.selectedFile,
      this.selectedFile.name
    );

    this.httpClient
      .post(
        "https://testing-spring-app.herokuapp.com/event/upload",
        uploadImageData,
        { observe: "response" }
      )
      .subscribe((response) => {
        if (response.status === 200) {
          this.eventinformation.imageId = Number.parseInt(
            response.body.toString()
          );
          this.httpClient
            .post(
              "https://testing-spring-app.herokuapp.com/event",
              this.eventinformation,
              { observe: "response" }
            )
            .subscribe((response) => {
              if (response.status === 200) {
                this.toastrservice.success("Success");
                this.toastrservice.info("New Event Added");
                console.log(response.body);
                this.getAll();
              }
            });
        }
      });
  }
  update() {
    $("#addModal").modal("hide");
    const uploadImageData = new FormData();
    uploadImageData.append(
      "imageFile",
      this.selectedFile,
      this.selectedFile.name
    );

    this.httpClient
      .post(
        "https://testing-spring-app.herokuapp.com/event/upload",
        uploadImageData,
        { observe: "response" }
      )
      .subscribe((response) => {
        if (response.status === 200) {
          this.eventinformation.imageId = Number.parseInt(
            response.body.toString()
          );
          this.httpClient
            .put(
              "https://testing-spring-app.herokuapp.com/event/" +
                this.eventinformation.id,
              this.eventinformation,
              { observe: "response" }
            )
            .subscribe((response) => {
              if (response.status === 200) {
                this.toastrservice.success("Success");
                this.toastrservice.info("Event Information updated");
                this.getAll();
                console.log(response.body);
              }
            });
        }
      });
  }
  //service call
  getAll() {
    this.eventsService.getAll().subscribe(
      (response) => {
        if (response) {
          console.log(response);
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else {
            this.eventsformationAll = response;
          }
        }
      },
      (error) => {}
    );
  }
}
