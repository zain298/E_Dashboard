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
          "EAAMoAIIgkYUBAClZA5xk3p3WkFTPWZBmboWlCJQZBgZBM6MzrRWaNbYV3DZCqzQSQ1DBs7TBC7BdNiWuBP4vbX6bPq9JocSf7MGROCrGepmZCc6rjxcKaZAgaJBZCNOxILCWzgdILRG0BPW3eOo7JXyVo0X2hqcxNS28QwZCyopBaJza92ITmdBHT",
      })
      .toPromise()
      .then(
        (data: any) => {
          console.log(data);
          this.toastrservice.success("Success");
          this.toastrservice.info("Text Message Posted");
        },
        (error) => {
          console.log(error);
        }
      );
  }
  PostLink(text: any, linkk: any) {
    let url = "https://graph.facebook.com/v11.0/104120661940124/feed?";
    this.http
      .post(url, {
        message: text,
        link: linkk,
        access_token:
          "EAAMoAIIgkYUBAClZA5xk3p3WkFTPWZBmboWlCJQZBgZBM6MzrRWaNbYV3DZCqzQSQ1DBs7TBC7BdNiWuBP4vbX6bPq9JocSf7MGROCrGepmZCc6rjxcKaZAgaJBZCNOxILCWzgdILRG0BPW3eOo7JXyVo0X2hqcxNS28QwZCyopBaJza92ITmdBHT",
      })
      .toPromise()
      .then((data: any) => {
        console.log(data);
        this.toastrservice.success("Success");
        this.toastrservice.info("Link Posted");
      });
  }
  PostImage(imgurl) {
    let url = "https://graph.facebook.com/v11.0/104120661940124/photos?";
    this.http
      .post(url, {
        url: imgurl,
        access_token:
          "EAAMoAIIgkYUBAClZA5xk3p3WkFTPWZBmboWlCJQZBgZBM6MzrRWaNbYV3DZCqzQSQ1DBs7TBC7BdNiWuBP4vbX6bPq9JocSf7MGROCrGepmZCc6rjxcKaZAgaJBZCNOxILCWzgdILRG0BPW3eOo7JXyVo0X2hqcxNS28QwZCyopBaJza92ITmdBHT",
      })
      .toPromise()
      .then((data: any) => {
        this.toastrservice.success("Success");
        this.toastrservice.info("Image Posted");
        console.log(data);
      });
  }
  PostVideo() {}
}
