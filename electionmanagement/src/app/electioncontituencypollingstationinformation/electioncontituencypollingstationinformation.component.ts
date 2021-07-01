import { Component, OnInit } from "@angular/core";
import { OnFailService } from "../services/on-fail.service";
import { ElectioncontituencypollingstationinformationService } from "../electioncontituencypollingstationinformation/electioncontituencypollingstationinformation.service";
import { ToastrService } from "ngx-toastr";
import { LookupService } from "../lookup/lookup.service";
import { ElectioncontituencyinformationService } from "../electioncontituencyinformation/electioncontituencyinformation.service";
declare var $: any;

@Component({
  selector: "app-electioncontituencypollingstationinformation",
  templateUrl: "./electioncontituencypollingstationinformation.component.html",
  styleUrls: ["./electioncontituencypollingstationinformation.component.css"],
})
export class ElectioncontituencypollingstationinformationComponent
  implements OnInit
{
  entitylist = [];
  electioncontituencypollingstationinformationAll = [];
  electiontypeActive = [];
  electioncontituencyinformationAll = [];
  electioncontituencypollingstationinformation = {
    pollingstation_ID: 0,
    contituency_ID: 0,
    description: "", //pollingStationName
    pollingstation_CODE: "",
    POLLINGSTATION_CODE:"",
    Contituency: "",
    district_NAME: "",
    //description: '',//province
    isactive: true,
  };
  orderno = [];
  constructor(
    private electioncontituencyinformationservice: ElectioncontituencyinformationService,
    private electioncontituencypollingstationinformationservice: ElectioncontituencypollingstationinformationService,
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

  View(electioncontituencypollingstationinformation) {
    const url =
      "view/demo/" +
      electioncontituencypollingstationinformation.data.pollingstation_ID +
      "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.electioncontituencypollingstationinformation = {
      pollingstation_ID: 0,
      POLLINGSTATION_CODE:"",
      description: "",
      pollingstation_CODE: "",
      Contituency: "",
      district_NAME: "",
      contituency_ID: 0,
      // description: '',
      isactive: true,
    };
    this.getAllContituencies();
    $("#addModal").modal("show");
  }

  uploadorder() {
    $("#addModal").modal("show");
  }

  getAllContituencies() {
    this.electioncontituencyinformationservice.getAll().subscribe(
      (response) => {
        if (response) {
          console.log(response);
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else {
            this.electioncontituencyinformationAll = response;
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }

  Edit(row) {
    this.electioncontituencypollingstationinformation = {
      pollingstation_ID: row.data.pollingstation_ID,
      description: row.data.description,
      contituency_ID: row.data.contituency_ID.contituency_ID,
      pollingstation_CODE: row.data.pollingstation_CODE,
      POLLINGSTATION_CODE:row.data.pollingstation_CODE,
      Contituency: row.data.contituency_ID.contituency_CODE,
      district_NAME: row.data.district_NAME,
      // description: row.data.description,
      isactive: true,
    };
    this.getAllContituencies();
    if (row.data.isactive == "Y") {
      this.electioncontituencypollingstationinformation.isactive = true;
    } else {
      this.electioncontituencypollingstationinformation.isactive = false;
    }
    $("#editModal").modal("show");
  }

  // APIs Call Functions
  Delete(row) {
    this.electioncontituencypollingstationinformationservice
      .delete(row.data.pollingstation_ID)
      .subscribe(
        (response) => {
          if (response) {
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.pollingstation_ID) {
              this.toastrservice.success("Success");
              this.toastrservice.info("Record Deleted");
              this.electioncontituencypollingstationinformation = response;
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
  getAll() {
    this.electioncontituencypollingstationinformationservice.getAll().subscribe(
      (response) => {
        if (response) {
          console.log(response);
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else {
            this.electioncontituencypollingstationinformationAll = response;
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }

  add(electioncontituencypollingstationinformation) {
    if (electioncontituencypollingstationinformation.Contituency == "") {
      electioncontituencypollingstationinformation.Contituency = this.electioncontituencyinformationAll[0].contituency_ID;
    } else {
      for (let contituency in this.electioncontituencyinformationAll) {
        if (
          electioncontituencypollingstationinformation.Contituency ==
          this.electioncontituencyinformationAll[contituency].contituency_CODE
        ) {
          electioncontituencypollingstationinformation.contituency_ID =
            this.electioncontituencyinformationAll[contituency].contituency_ID;
        }
      }
    }
    if (electioncontituencypollingstationinformation.electiontype_ID != null) {
      electioncontituencypollingstationinformation.electiontype_ID =
        electioncontituencypollingstationinformation.electiontype_ID.id;
    } else {
      electioncontituencypollingstationinformation.electiontype_ID == null;
    }
    this.electioncontituencypollingstationinformationservice
      .add(electioncontituencypollingstationinformation)
      .subscribe(
        (response) => {
          if (response) {
            console.log(response);

            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.pollingstation_ID) {
              this.toastrservice.success("Success");
              this.toastrservice.info("New Polling Station Information Added");
              this.electioncontituencypollingstationinformation = response;
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

  update(electioncontituencypollingstationinformation) {
    if (electioncontituencypollingstationinformation.Contituency == "") {
      electioncontituencypollingstationinformation.Contituency = this.electioncontituencyinformationAll[0].contituency_ID;
    } else {
      for (let contituency in this.electioncontituencyinformationAll) {
        if (
          electioncontituencypollingstationinformation.Contituency ==
          this.electioncontituencyinformationAll[contituency].contituency_CODE
        ) {
          electioncontituencypollingstationinformation.contituency_ID =
            this.electioncontituencyinformationAll[contituency].contituency_ID;
        }
      }
    }
    if (electioncontituencypollingstationinformation.isactive == true) {
      electioncontituencypollingstationinformation.isactive = "Y";
    } else {
      electioncontituencypollingstationinformation.isactive = "N";
    }
    if (electioncontituencypollingstationinformation.electiontype_ID != null) {
      electioncontituencypollingstationinformation.electiontype_ID =
        electioncontituencypollingstationinformation.electiontype_ID.id;
    } else {
      electioncontituencypollingstationinformation.electiontype_ID == null;
    }
    this.electioncontituencypollingstationinformationservice
      .update(
        electioncontituencypollingstationinformation,
        electioncontituencypollingstationinformation.pollingstation_ID
      )
      .subscribe(
        (response) => {
          if (response) {
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.pollingstation_ID) {
              this.toastrservice.success("Success");
              this.toastrservice.info("Polling Station Record Updated");
              this.electioncontituencypollingstationinformation = response;
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

  getElectionType() {
    this.lookupservice.lookup("DRIVERTYPE").subscribe(
      (response) => {
        if (response) {
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else {
            this.electiontypeActive = response;
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }
}
