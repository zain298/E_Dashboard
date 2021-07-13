import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

declare var $: any;
@Component({
  selector: "app-socialaccounts",
  templateUrl: "./socialaccounts.component.html",
  styleUrls: ["./socialaccounts.component.css"],
})
export class SocialaccountsComponent implements OnInit {
  textmessage = "";
  linkurl = "";
  linkcaption = "";
  imageurl = "";
  videourl = "";
  constructor(private http: HttpClient, private toastrservice: ToastrService) {}

  ngOnInit() {}
  message() {
    this.textmessage = "";
    $("#textModal").modal("show");
  }
  link() {
    this.linkurl = "";
    $("#linkModal").modal("show");
  }
  image() {
    this.imageurl = "";
    $("#imageModal").modal("show");
  }
  video() {
    this.videourl = "";
    $("#videoModal").modal("show");
  }
  PostMesssage(text) {
    $("#textModal").modal("hide");

    let url = "https://graph.facebook.com/v11.0/104120661940124/feed?";
    this.http
      .post(url, {
        message: text,
        access_token:
          "EAAMoAIIgkYUBADmC2v6OPPCMYc98r6FgSoRcqomZCyZBqfSUthyonBwntYVMkLZCUFJVTcP2hyZC6zZCbgQZBWy2gNNol2CzF6QZAtmwscP1hagPfcuuN3vdeSsmH6MOFWtU7Pltq9pp2ZAwCRuQxSCMdRQlUNPr3Em00NEZConW1JGPDvfqMq9gT",
      })
      .toPromise()
      .then((data: any) => {
        console.log(data);
      });
    this.toastrservice.success("Success");
    this.toastrservice.info("Text Message Posted");
  }
  PostLink(text: any, linkk: any) {
    let url = "https://graph.facebook.com/v11.0/104120661940124/feed?";
    this.http
      .post(url, {
        message: text,
        link: linkk,
        access_token:
          "EAAMoAIIgkYUBADmC2v6OPPCMYc98r6FgSoRcqomZCyZBqfSUthyonBwntYVMkLZCUFJVTcP2hyZC6zZCbgQZBWy2gNNol2CzF6QZAtmwscP1hagPfcuuN3vdeSsmH6MOFWtU7Pltq9pp2ZAwCRuQxSCMdRQlUNPr3Em00NEZConW1JGPDvfqMq9gT",
      })
      .toPromise()
      .then((data: any) => {
        console.log(data);
      });
  }
  PostImage(imgurl) {
    let url = "https://graph.facebook.com/v11.0/104120661940124/photos?";
    this.http
      .post(url, {
        url: imgurl,
        access_token:
          "EAAMoAIIgkYUBADmC2v6OPPCMYc98r6FgSoRcqomZCyZBqfSUthyonBwntYVMkLZCUFJVTcP2hyZC6zZCbgQZBWy2gNNol2CzF6QZAtmwscP1hagPfcuuN3vdeSsmH6MOFWtU7Pltq9pp2ZAwCRuQxSCMdRQlUNPr3Em00NEZConW1JGPDvfqMq9gT",
      })
      .toPromise()
      .then((data: any) => {
        console.log(data);
      });
  }
  PostVideo() {}
}
