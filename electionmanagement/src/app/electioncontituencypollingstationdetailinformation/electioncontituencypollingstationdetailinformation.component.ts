import { Component, OnInit } from "@angular/core";
import { OnFailService } from "../services/on-fail.service";
import { ElectioncontituencypollingstationdetailinformationService } from "../electioncontituencypollingstationdetailinformation/electioncontituencypollingstationdetailinformation.service";
import { ElectioncontituencypollingstationinformationService } from "../electioncontituencypollingstationinformation/electioncontituencypollingstationinformation.service";
import { ToastrService } from "ngx-toastr";
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: "app-electioncontituencypollingstationdetailinformation",
  templateUrl:
    "./electioncontituencypollingstationdetailinformation.component.html",
  styleUrls: [
    "./electioncontituencypollingstationdetailinformation.component.css",
  ],
})
export class ElectioncontituencypollingstationdetailinformationComponent
  implements OnInit
{
  entitylist = [];
  electioncontituencypollingstationinformationAll = [];
  genderAll = [];
  electioncontituencypollingstationdetailinformationAll = [];
  areatypeAll = [];
  electioncontituencypollingstationdetailinformation = {
    pollingsattiondetail_ID: 0,
    stationName: "",
    areatype: "",
    pollingstation_ID: 0,
    person_ID: 0,
    areatype_ID: 0,
    assignedvoters: "",
    voters: 0,
    electoralarea: "",
    blockcode: "",
    district: "",
    gander: "",
    contituency: "",
    isactive: true,
  };
  orderno = [];
  constructor(
    private electioncontituencypollingstationdetailinformationservice: ElectioncontituencypollingstationdetailinformationService,
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

  View(electioncontituencypollingstationdetailinformation) {
    const url =
      "view/demo/" +
      electioncontituencypollingstationdetailinformation.data
        .pollingsattiondetail_ID +
      "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }
  getAllStations() {
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

  AddNew() {
    this.electioncontituencypollingstationdetailinformation = {
      pollingsattiondetail_ID: 0,
      stationName: "",
      voters: 0,
      pollingstation_ID: 0,
      person_ID: 0,
      areatype: "",
      areatype_ID: 0,
      assignedvoters: "",
      electoralarea: "",
      blockcode: "",
      district: "",
      contituency: "",
      gander: "",
      isactive: true,
    };
    this.getAllStations();
    this.getAreaTypeActive();
    this.getAllGenders();
    // this.getElectionType();
    $("#addModal").modal("show");
  }

  uploadorder() {
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.electioncontituencypollingstationdetailinformation = {
      pollingsattiondetail_ID: row.data.pollingsattiondetail_ID,
      stationName: row.data.pollingstation_ID.description,
      areatype_ID: row.data.areatype_ID.id,
      person_ID: row.data.areatype_ID.id,
      pollingstation_ID: row.data.pollingstation_ID.pollingstation_ID,
      assignedvoters: row.data.assignedvoters,
      voters: row.data.assignedvoters,
      electoralarea: row.data.electoralarea,
      areatype: row.data.areatype_ID.description,
      blockcode: row.data.blockcode,
      district:
        row.data.pollingstation_ID.contituency_ID.district_ID.district_CODE,
      gander: row.data.gander,
      contituency: row.data.pollingstation_ID.contituency_ID.contituency_CODE,
      isactive: true,
    };
    if (row.data.isactive == "Y") {
      this.electioncontituencypollingstationdetailinformation.isactive = true;
    } else {
      this.electioncontituencypollingstationdetailinformation.isactive = false;
    }
    this.getAllGenders();
    this.getAllStations();
    this.getAreaTypeActive();
    // this.getElectionType();
    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
    this.electioncontituencypollingstationdetailinformationservice
      .getAll()
      .subscribe(
        (response) => {
          if (response) {
            console.log(response);
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else {
              this.electioncontituencypollingstationdetailinformationAll =
                response;
            }
          }
        },
        (error) => {
          this.onfailservice.onFail(error);
        }
      );
  }

  add(electioncontituencypollingstationdetailinformation) {
    if (electioncontituencypollingstationdetailinformation.stationName == "") {
      electioncontituencypollingstationdetailinformation.pollingstation_ID =
        this.electioncontituencypollingstationinformationAll[0].pollingstation_ID;
    } else {
      for (let station in this
        .electioncontituencypollingstationinformationAll) {
        if (
          electioncontituencypollingstationdetailinformation.stationName ==
          this.electioncontituencypollingstationinformationAll[station]
            .description
        ) {
          electioncontituencypollingstationdetailinformation.pollingstation_ID =
            this.electioncontituencypollingstationinformationAll[
              station
            ].pollingstation_ID;
        }
      }
    }

    if (electioncontituencypollingstationdetailinformation.areatype == "") {
      electioncontituencypollingstationdetailinformation.areatype_ID =
        this.areatypeAll[0].id;
      electioncontituencypollingstationdetailinformation.person_ID =
        this.areatypeAll[0].id;
    } else {
      for (let area in this.areatypeAll) {
        if (
          electioncontituencypollingstationdetailinformation.areatype ==
          this.areatypeAll[area].description
        ) {
          electioncontituencypollingstationdetailinformation.areatype_ID =
            this.areatypeAll[area].id;
          electioncontituencypollingstationdetailinformation.person_ID =
            this.areatypeAll[area].id;
        }
      }
    }
    this.electioncontituencypollingstationdetailinformationservice
      .add(electioncontituencypollingstationdetailinformation)
      .subscribe(
        (response) => {
          if (response) {
            console.log(response);

            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.pollingsattiondetail_ID) {
              this.toastrservice.success("Success");
              this.toastrservice.info("New Polling Station Detail Added");
              this.electioncontituencypollingstationdetailinformation =
                response;
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
  Delete(row) {
    this.electioncontituencypollingstationdetailinformationservice
      .delete(row.data.pollingsattiondetail_ID)
      .subscribe(
        (response) => {
          if (response) {
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.pollingsattiondetail_ID) {
              this.toastrservice.success("Success");
              this.toastrservice.info(
                "Polling Station Detailed Record Deleted"
              );

              this.electioncontituencypollingstationdetailinformation =
                response;
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
  update(electioncontituencypollingstationdetailinformation) {
    if (electioncontituencypollingstationdetailinformation.stationName == "") {
      electioncontituencypollingstationdetailinformation.pollingstation_ID =
        this.electioncontituencypollingstationinformationAll[0].pollingstation_ID;
    } else {
      for (let station in this
        .electioncontituencypollingstationinformationAll) {
        if (
          electioncontituencypollingstationdetailinformation.stationName ==
          this.electioncontituencypollingstationinformationAll[station]
            .description
        ) {
          electioncontituencypollingstationdetailinformation.pollingstation_ID =
            this.electioncontituencypollingstationinformationAll[
              station
            ].pollingstation_ID;
        }
      }
    }

    if (electioncontituencypollingstationdetailinformation.areatype == "") {
      electioncontituencypollingstationdetailinformation.areatype_ID =
        this.areatypeAll[0].id;
      electioncontituencypollingstationdetailinformation.person_ID =
        this.areatypeAll[0].id;
    } else {
      for (let area in this.areatypeAll) {
        if (
          electioncontituencypollingstationdetailinformation.areatype ==
          this.areatypeAll[area].description
        ) {
          electioncontituencypollingstationdetailinformation.areatype_ID =
            this.areatypeAll[area].id;
          electioncontituencypollingstationdetailinformation.person_ID =
            this.areatypeAll[area].id;
        }
      }
    }

    if (electioncontituencypollingstationdetailinformation.isactive == true) {
      electioncontituencypollingstationdetailinformation.isactive = "Y";
    } else {
      electioncontituencypollingstationdetailinformation.isactive = "N";
    }

    this.electioncontituencypollingstationdetailinformationservice
      .update(
        electioncontituencypollingstationdetailinformation,
        electioncontituencypollingstationdetailinformation.pollingsattiondetail_ID
      )
      .subscribe(
        (response) => {
          if (response) {
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.pollingsattiondetail_ID) {
              this.toastrservice.success("Success");
              this.toastrservice.info("Polling Station Detail Updated");

              this.electioncontituencypollingstationdetailinformation =
                response;
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
  getAreaTypeActive() {
    this.areatypeAll = [
      { id: 1012, description: "Rural" },
      { id: 1013, description: "Urban" },
    ];
  }

  getAllGenders() {
    this.genderAll = ["M", "F"];
  }
}
