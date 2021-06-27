import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
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
  editorE: FormGroup;
  constructor() {
    this.editorE = new FormGroup({
      editeditor: new FormControl("boi"),
    });
  }

  editorForm: FormGroup;
  // var text=Document.getElementById("mytextarea");
  ngOnInit() {
    this.editorForm = new FormGroup({
      editor: new FormControl(""),
    });
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

  AddNew() {
    // var editorVal = "";
    // this.ngOnChanges(editorVal);

    // $("#mytextarea").val("<p>editor boi</p>");
    $("#addModal").modal("show");
    // $("#mytextarea").tinymce().save();
  }

  Edit(row) {
    // console.log(row);
    // var valueee = { val: "d" };
    // this.editorE.patchValue({ editeditor: "boi how" });

    $("#editModal").modal("show");
  }
  Delete() {}

  add(newsinformation) {
    // let value = document.getElementById("eventDes").nodeValue;
    // console.log(value);
    // $("#mytextarea").tinymce().save();

    var message = $("#mytextarea").val();
    console.log("textarea message: " + message);
    this.textareaValue = message;
    console.log("textarea value: " + this.textareaValue);
    console.log("typeof-> textarea value: " + typeof this.textareaValue);

    newsinformation.news_Descc = this.textareaValue;
    console.log(newsinformation);
    // this.getTextArea();
    // console.log("ReactiveForm value: " + this.textareaValue);
    // console.log("ReactiveForm value: " + this.editorForm.value);
    // console.log("ReactiveForm value: " + JSON.stringify(this.editorForm.value));
  }
  update() {}
  // getTextArea() {
  //   let value = document.getElementById("mytextarea"); // Gets value of 'inputMethod' textarea
  //   console.log(value); // Prints value to console
  //   return value;
  // }
}
