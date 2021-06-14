import { Component, OnInit } from "@angular/core";
import { OnFailService } from "../services/on-fail.service";
import { ElectionvoterinformationService } from "../Electionvoterinformation/Electionvoterinformation.service";
import { ToastrService } from "ngx-toastr";
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: "app-Electionvoterinformation",
  templateUrl: "./Electionvoterinformation.component.html",
  styleUrls: ["./Electionvoterinformation.component.css"],
})
export class ElectionvoterinformationComponent implements OnInit {
  entitylist = [];
  ElectionvoterinformationAll = [];
  electiontypeActive = [];
  Electionvoterinformation = {
    voter_ID: 0,
    name: "",
    father_NAME: "",
    cnic: "",
    //electiontype_ID: {},
    address: "",
    family_NO: "",
    // blockcode:'',
    isactive: true,
  };
  orderno = [];
  constructor(
    private Electionvoterinformationservice: ElectionvoterinformationService,
    private onfailservice: OnFailService,
    private toastrservice: ToastrService,
    private lookupservice: LookupService
  ) {}

  ngOnInit() {
    this.getAll();

    for (var i = 0; i <= 50; i++) {
      this.orderno.push({ value: i });
    }
  }

  // Frontend Actions

  View(Electionvoterinformation) {
    const url =
      "view/demo/" + Electionvoterinformation.data.voter_ID + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.Electionvoterinformation = {
      voter_ID: 0,
      name: "",
      father_NAME: "",
      cnic: "",
      //electiontype_ID: {},
      address: "",
      family_NO: "",
      //  blockcode:'',

      isactive: true,
    };
    // this.getelectionType();
    $("#addModal").modal("show");
  }

  uploadorder() {
    $("#addModal").modal("show");
  }
  Delete(row) {
    console.log(row.data.voter_ID);
    this.Electionvoterinformationservice.delete(row.data.voter_ID).subscribe(
      (response) => {
        if (response) {
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else if (response.voter_ID) {
            this.toastrservice.success("Success");
            this.toastrservice.info("Voter Record Deleted");
            this.Electionvoterinformation = response;
            this.getAll();
            $("#editModal").modal("hide");
          } else {
            this.toastrservice.error("Some thing went wrong");
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }
  Edit(row) {
    this.Electionvoterinformation = {
      voter_ID: row.data.voter_ID,
      name: row.data.name,
      father_NAME: row.data.father_NAME,
      cnic: row.data.cnic,
      // electiontype_ID: row.data.electiontype_ID!=null?row.data.electiontype_ID.id:null,
      address: row.data.address,
      family_NO: row.data.family_NO,
      // blockcode:row.data.blockcode,
      isactive: true,
    };
    if (row.data.isactive == "Y") {
      this.Electionvoterinformation.isactive = true;
    } else {
      this.Electionvoterinformation.isactive = false;
    }
    // this.getelectionType();
    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
    this.Electionvoterinformationservice.getAll().subscribe(
      (response) => {
        if (response) {
          console.log(response);
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else {
            this.ElectionvoterinformationAll = response;
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }

  add(Electionvoterinformation) {
    if (Electionvoterinformation.electiontype_ID != null) {
      Electionvoterinformation.electiontype_ID =
        Electionvoterinformation.electiontype_ID.id;
    } else {
      Electionvoterinformation.electiontype_ID == null;
    }
    this.Electionvoterinformationservice.add(
      Electionvoterinformation
    ).subscribe(
      (response) => {
        if (response) {
          console.log(response);

          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else if (response.voter_ID) {
            this.toastrservice.success("Success");
            this.toastrservice.info("New Voter Record Added");

            this.Electionvoterinformation = response;
            this.getAll();

            $("#addModal").modal("hide");
          } else {
            this.toastrservice.error("Some thing went wrong");
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }

  update(Electionvoterinformation) {
    if (Electionvoterinformation.isactive == true) {
      Electionvoterinformation.isactive = "Y";
    } else {
      Electionvoterinformation.isactive = "N";
    }
    if (Electionvoterinformation.electiontype_ID != null) {
      Electionvoterinformation.electiontype_ID =
        Electionvoterinformation.electiontype_ID.id;
    } else {
      Electionvoterinformation.electiontype_ID == null;
    }
    this.Electionvoterinformationservice.update(
      Electionvoterinformation,
      Electionvoterinformation.voter_ID
    ).subscribe(
      (response) => {
        if (response) {
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else if (response.voter_ID) {
            this.toastrservice.success("Success");
            this.toastrservice.info("Voter Record Updated");

            this.Electionvoterinformation = response;
            this.getAll();
            $("#editModal").modal("hide");
          } else {
            this.toastrservice.error("Some thing went wrong");
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }

  // getelectionType() {
  //   this.lookupservice.lookup("electionTYPE").subscribe(
  //     (response) => {
  //       if (response) {
  //         if (response.error && response.status) {
  //           this.toastrservice.warning("Message", " " + response.message);
  //         } else {
  //           this.electiontypeActive = response;
  //         }
  //       }
  //     },
  //     (error) => {
  //       this.onfailservice.onFail(error);
  //     }
  //   );
  // }
}
