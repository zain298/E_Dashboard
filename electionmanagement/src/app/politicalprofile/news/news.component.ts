import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { NewsService } from "./news.service";
// import { FILE } from "dns";
declare var $: any;
@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
})
export class NewsComponent implements OnInit {
  public textareaValue: string;
  newsformationAll = [];
  selectedFile: File;
  newsinformation = {
    id: 0,
    title: "",
    imageId: 0,
    description: "",
    date: "",
    author: "",
  };

  // static editorE: FormGroup;
  constructor(
    private httpClient: HttpClient,
    private newsService: NewsService,
    private toastrservice: ToastrService,
    private datePipe: DatePipe
  ) {
    // this.editorE = new FormGroup({
    //   editeditor: new FormControl("boi"),
    // });
  }
  // editorE: FormGroup;
  editorE = new FormGroup({
    editeditor: new FormControl(
      '<p>hi,<strong> I am Zain</strong></p>\n<p>Wellcome To My Blog!</p>\n<p style="text-align: left; padding-left: 40px;">This <span style="color: #e03e2d;">blog</span> contains the information about over <em>FYP</em>.</p>'
    ),
  });
  // editorForm: FormGroup;
  editorForm = new FormGroup({
    editor: new FormControl(""),
  });

  // var text=Document.getElementById("mytextarea");
  ngOnInit() {
    this.getAll();
  }
  // ngOnChanges(editorVal: any) {
  //   this.editorForm = new FormGroup({
  //     editor: new FormControl(editorVal),
  //   });
  // }

  OnSave() {
    var message = $("#mytextarea").val();
    console.log("OnSave() -> textarea value: " + message);
  }
  // onfilechanged(event) {
  //   console.log("bhaii yeh kiya: " + event.target.files[0].name);
  // }
  AddNew() {
    this.newsinformation = {
      id: 0,
      title: "",
      imageId: 0,
      description: "",
      date: "",
      author: "",
    };
    $("#addModal").modal("show");
    // var editorVal = "";
    // this.ngOnChanges(editorVal);

    // $("#mytextarea").val("<p>editor boi</p>");

    // $("#mytextarea").tinymce().save();
  }
  Edit(row) {
    // NewsComponent.editorE
    let date = this.datePipe.transform(new Date(row.date), "yyyy-MM-dd");

    this.editorE = new FormGroup({ editeditor: new FormControl("zain") });
    // this.editorE.controls["editeditor"].setValue("bilo");
    this.newsinformation = {
      id: row.id,
      title: row.title,
      imageId: 0,
      description: "",
      date: date,
      author: row.author,
    };
    $("#editModal").modal("show");

    // console.log(row);
    // var valueee = { val: "d" };
    // this.editorE.patchValue({ editeditor: "boi how" });
  }
  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  add(newsinformation) {
    //  for getting textarea value

    var message = $("#mytextarea").val();
    this.textareaValue = message;
    // console.log("textarea message: " + message);
    // console.log("textarea value: " + this.textareaValue);
    // console.log("typeof-> textarea value: " + typeof this.textareaValue);
    //setting textarea value in in json array
    newsinformation.description = this.textareaValue;
    console.log(newsinformation);

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
          this.newsinformation.imageId = Number.parseInt(
            response.body.toString()
          );
          this.httpClient
            .post(
              "https://testing-spring-app.herokuapp.com/news",
              this.newsinformation,
              { observe: "response" }
            )
            .subscribe((response) => {
              if (response.status === 200) {
                console.log(response.body);
                this.toastrservice.success("Success");
                this.toastrservice.info("News Added");
                $("#addModal").modal("hide");
                this.getAll();
              }
            });
        }
      });
  }

  Delete(id) {
    console.log("Deleted Id: " + id);
    this.httpClient
      .delete("https://testing-spring-app.herokuapp.com/news/" + id)
      .subscribe((response) => {
        if (response == null) {
          console.log(response);
          this.toastrservice.success("Success");
          this.toastrservice.info("News Deleted");
          this.getAll();
        }
      });
  }

  // add(newsinformation) {
  //   // let value = document.getElementById("eventDes").nodeValue;
  //   // console.log(value);
  //   // $("#mytextarea").tinymce().save();
  //   //for image name

  //   let img = newsinformation.news_image;
  //   let image_name = img.split(`\\`);
  //   newsinformation.news_image = image_name[2];

  //   //for getting textarea value

  //   var message = $("#mytextarea").val();
  //   this.textareaValue = message;
  //   console.log("textarea message: " + message);
  //   console.log("textarea value: " + this.textareaValue);
  //   console.log("typeof-> textarea value: " + typeof this.textareaValue);
  //   //setting textarea value in in json array
  //   newsinformation.news_Descc = this.textareaValue;
  //   console.log(newsinformation);

  //   // this.getTextArea();
  //   // console.log("ReactiveForm value: " + this.textareaValue);
  //   // console.log("ReactiveForm value: " + this.editorForm.value);
  //   // console.log("ReactiveForm value: " + JSON.stringify(this.editorForm.value));
  // }
  // update() {
  //   this.editorE.get("editeditor").value;
  // }
  update(newsinformation) {
    var message = $("#myedittextarea").val();
    this.textareaValue = message;
    newsinformation.description = this.textareaValue;
    console.log(newsinformation);

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
          this.newsinformation.imageId = Number.parseInt(
            response.body.toString()
          );
          this.httpClient
            .put(
              "https://testing-spring-app.herokuapp.com/news/" +
                // here id missing
                this.newsinformation.id,
              this.newsinformation,
              { observe: "response" }
            )
            .subscribe((response) => {
              if (response.status === 200) {
                this.toastrservice.success("Success");
                this.toastrservice.info("News Information updated");
                $("#editModal").modal("hide");
                this.getAll();
                console.log(response.body);
              }
            });
        }
      });
  }
  // getTextArea() {
  //   let value = document.getElementById("mytextarea"); // Gets value of 'inputMethod' textarea
  //   console.log(value); // Prints value to console
  //   return value;
  // }

  // api Requests
  getAll() {
    this.newsService.getAll().subscribe(
      (response) => {
        if (response) {
          console.log(response);
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else {
            this.newsformationAll = response;
            // console.log("newsformationAll[]= " + this.newsformationAll);
          }
        }
      },
      (error) => {}
    );
  }
}
