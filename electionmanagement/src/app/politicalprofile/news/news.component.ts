import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
// import { FILE } from "dns";
declare var $: any;
@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
})
export class NewsComponent implements OnInit {
  public textareaValue: string;
  newsinformation = {
    news_ID: 0,
    news_DATE: "",
    news_image: "",
    news_Descc: "",
    news_Auther: "",
    news_Title: "",
    isactive: true,
  };
  // static editorE: FormGroup;
  constructor() {
    // this.editorE = new FormGroup({
    //   editeditor: new FormControl("boi"),
    // });
  }
  // editorE: FormGroup;
  editorE = new FormGroup({
    editeditor: new FormControl("<b>boiii</b>"),
  });
  // editorForm: FormGroup;
  editorForm = new FormGroup({
    editor: new FormControl(""),
  });

  // var text=Document.getElementById("mytextarea");
  ngOnInit() {}
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
    // var editorVal = "";
    // this.ngOnChanges(editorVal);

    // $("#mytextarea").val("<p>editor boi</p>");
    $("#addModal").modal("show");
    // $("#mytextarea").tinymce().save();
  }

  Edit() {
    // NewsComponent.editorE
    this.editorE = new FormGroup({ editeditor: new FormControl("zain") });
    $("#editModal").modal("show");

    // console.log(row);
    // var valueee = { val: "d" };
    // this.editorE.patchValue({ editeditor: "boi how" });
  }
  Delete() {}

  add(newsinformation) {
    // let value = document.getElementById("eventDes").nodeValue;
    // console.log(value);
    // $("#mytextarea").tinymce().save();
    //for image name

    let img = newsinformation.news_image;
    let image_name = img.split(`\\`);
    newsinformation.news_image = image_name[2];

    //for getting textarea value

    var message = $("#mytextarea").val();
    this.textareaValue = message;
    console.log("textarea message: " + message);
    console.log("textarea value: " + this.textareaValue);
    console.log("typeof-> textarea value: " + typeof this.textareaValue);
    //setting textarea value in in json array
    newsinformation.news_Descc = this.textareaValue;
    console.log(newsinformation);

    // this.getTextArea();
    // console.log("ReactiveForm value: " + this.textareaValue);
    // console.log("ReactiveForm value: " + this.editorForm.value);
    // console.log("ReactiveForm value: " + JSON.stringify(this.editorForm.value));
  }
  update() {
    this.editorE.get("editeditor").value;
  }
  // getTextArea() {
  //   let value = document.getElementById("mytextarea"); // Gets value of 'inputMethod' textarea
  //   console.log(value); // Prints value to console
  //   return value;
  // }
}
