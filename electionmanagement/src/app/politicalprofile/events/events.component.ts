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

  ngOnInit() {}
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

    $("#editModal").modal("show");
  }
  Delete() {}

  add(eventinformation) {
   
    const uploadImageData = new FormData();
    uploadImageData.append(
      "imageFile",
      this.selectedFile,
      this.selectedFile.name
    );

    this.httpClient
      .post(
        "https://testing-spring-app.herokuapp.com/image/upload",
        uploadImageData,
        { observe: "response" }
      )
      .subscribe((response) => {
        if (response.status === 200) {
          this.eventinformation.imageId=Number.parseInt(response.body.toString())
          this.httpClient
            .post(
              "https://testing-spring-app.herokuapp.com/image",
              this.eventinformation,
              { observe: "response" }
            )
            .subscribe((response) => {
              if (response.status === 200) {
                console.log(response.body);
              }
            });
        }
      });
  }
  update() {}
}
