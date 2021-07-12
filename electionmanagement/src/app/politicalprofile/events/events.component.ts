import { HttpClient } from "@angular/common/http";
import { Http } from "@angular/http";
import { Component, OnInit } from "@angular/core";
declare var $: any;
@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"],
})
export class EventsComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}
  selectedFile: File;
  eventinformation = {
    event_ID: 0,
    event_DATE: "",
    event_Desc: "",
    event_Venue: "",
    event_Title: "",
    event_image: "",
    isactive: true,
  };
  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit() {}
  AddNew() {
    this.eventinformation = {
      event_ID: 0,
      event_DATE: "",
      event_Desc: "",
      event_Venue: "",
      event_Title: "",
      event_image: "",
      isactive: true,
    };
    $("#addModal").modal("show");
  }
  Edit(row) {
    console.log(row);

    $("#editModal").modal("show");
  }
  Delete() {}

  add() {
    console.log(this.selectedFile);

    const uploadImageData = new FormData();
    uploadImageData.append(
      "imageFile",
      this.selectedFile,
      this.selectedFile.name
    );

    this.httpClient
      .post("http://127.0.0.1:8080/imgage/upload", uploadImageData, {
        observe: "response",
      })
      .subscribe((response) => {
        if (response.status === 200) {
          let message = "Image upload Successfully";
          console.log(message);
        } else {
          let message = "Image not uploadded";
          console.log(message);
        }
      });
  }
  update() {}
}
