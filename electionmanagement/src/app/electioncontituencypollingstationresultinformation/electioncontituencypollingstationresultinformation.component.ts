import { Component, OnInit } from "@angular/core";
import { OnFailService } from "../services/on-fail.service";
import { ElectioncontituencypollingstationinformationService } from "../electioncontituencypollingstationinformation/electioncontituencypollingstationinformation.service";
import { ElectioncontituencypollingstationresultinformationService } from "../electioncontituencypollingstationresultinformation/electioncontituencypollingstationresultinformation.service";
import { PoliticalpartycandidateinformationService } from "../politicalpartycandidateinformation/politicalpartycandidateinformation.service";
import { ToastrService } from "ngx-toastr";
import { LookupService } from "../lookup/lookup.service";
// import { }

declare var $: any;

@Component({
  selector: "app-electioncontituencypollingstationresultinformation",
  templateUrl:
    "./electioncontituencypollingstationresultinformation.component.html",
  styleUrls: [
    "./electioncontituencypollingstationresultinformation.component.css",
  ],
})
export class ElectioncontituencypollingstationresultinformationComponent
  implements OnInit
{
  entitylist = [];
  electioncontituencypollingstationinformationAll = [];
  politicalpartycandidateinformationAll = [];
  electioncontituencypollingstationresultinformationAll = [];
  electiontypeActive = [];
  electioncontituencypollingstationresultinformation = {
    pollingstationresult_ID: 0,
    pollingstation_ID: 0,
    obtained_VOTES: 0,
    candidate_ID: 0,
    resultfrom_ID: 1017,
    candidate_name: "",
    stationName: "",
    isactive: true,
  };
  orderno = [];
  constructor(
    private politicalpartycandidateinformationservice: PoliticalpartycandidateinformationService,
    private electioncontituencypollingstationinformationservice: ElectioncontituencypollingstationinformationService,
    private electioncontituencypollingstationresultinformationservice: ElectioncontituencypollingstationresultinformationService,
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

  View(electioncontituencypollingstationresultinformation) {
    const url =
      "view/demo/" +
      electioncontituencypollingstationresultinformation.data
        .pollingstationresult_ID +
      "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.electioncontituencypollingstationresultinformation = {
      pollingstationresult_ID: 0,
      pollingstation_ID: 0,
      obtained_VOTES: 0,
      candidate_name: "",
      candidate_ID: 0,
      stationName: "",
      resultfrom_ID: 1017,
      isactive: true,
    };
    this.getAllStations();
    this.getAllCandidates();
    // this.getElectionType();
    $("#addModal").modal("show");
  }

  uploadorder() {
    $("#addModal").modal("show");
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

  getAllCandidates() {
    this.politicalpartycandidateinformationservice.getAll().subscribe(
      (response) => {
        if (response) {
          console.log(response);
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else {
            this.politicalpartycandidateinformationAll = response;
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }

  Edit(row) {
    this.electioncontituencypollingstationresultinformation = {
      pollingstationresult_ID: row.data.pollingstationresult_ID,
      pollingstation_ID: row.data.pollingstation_ID,
      obtained_VOTES: row.data.obtained_VOTES,
      candidate_ID: row.data.candidate_ID.candidate_ID,
      candidate_name:
        row.data.candidate_ID.person_ID.forenames +
        " " +
        row.data.candidate_ID.person_ID.surname,
      stationName: row.data.pollingstation_ID.description,
      resultfrom_ID: 1017,
      isactive: true,
    };
    this.getAllStations();
    this.getAllCandidates();
    if (row.data.isactive == "Y") {
      this.electioncontituencypollingstationresultinformation.isactive = true;
    } else {
      this.electioncontituencypollingstationresultinformation.isactive = false;
    }
    // this.getElectionType();
    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
    this.electioncontituencypollingstationresultinformationservice
      .getAll()
      .subscribe(
        (response) => {
          if (response) {
            console.log(response);
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else {
              this.electioncontituencypollingstationresultinformationAll =
                response;
            }
          }
        },
        (error) => {
          this.onfailservice.onFail(error);
        }
      );
  }

  add(electioncontituencypollingstationresultinformation) {
    if (
      electioncontituencypollingstationresultinformation.candidate_name == ""
    ) {
      electioncontituencypollingstationresultinformation.candidate_ID =
        this.politicalpartycandidateinformationAll[0].candidate_ID;
    } else {
      for (let candidate in this.politicalpartycandidateinformationAll) {
        if (
          electioncontituencypollingstationresultinformation.candidate_name ==
          this.politicalpartycandidateinformationAll[candidate].person_ID
            .forenames
        ) {
          electioncontituencypollingstationresultinformation.candidate_ID =
            this.politicalpartycandidateinformationAll[candidate].candidate_ID;
        }
      }
    }
    if (electioncontituencypollingstationresultinformation.stationName == "") {
      electioncontituencypollingstationresultinformation.pollingstation_ID =
        this.electioncontituencypollingstationinformationAll[0].pollingstation_ID;
    } else {
      for (let station in this
        .electioncontituencypollingstationinformationAll) {
        if (
          electioncontituencypollingstationresultinformation.stationName ==
          this.electioncontituencypollingstationinformationAll[station]
            .description
        ) {
          electioncontituencypollingstationresultinformation.pollingstation_ID =
            this.electioncontituencypollingstationinformationAll[
              station
            ].pollingstation_ID;
        }
      }
    }
    if (
      electioncontituencypollingstationresultinformation.electiontype_ID != null
    ) {
      electioncontituencypollingstationresultinformation.electiontype_ID =
        electioncontituencypollingstationresultinformation.electiontype_ID.id;
    } else {
      electioncontituencypollingstationresultinformation.electiontype_ID ==
        null;
    }
    this.electioncontituencypollingstationresultinformationservice
      .add(electioncontituencypollingstationresultinformation)
      .subscribe(
        (response) => {
          if (response) {
            console.log(response);

            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.pollingstationresult_ID) {
              this.toastrservice.success("Success");
              this.toastrservice.info("New Polling Station Result Added");

              this.electioncontituencypollingstationresultinformation =
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
    this.electioncontituencypollingstationresultinformationservice
      .delete(row.data.pollingstationresult_ID)
      .subscribe(
        (response) => {
          if (response) {
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.pollingstationresult_ID) {
              this.toastrservice.success("Success");
              this.toastrservice.info("Polling Station Result Deleted");
              this.electioncontituencypollingstationresultinformation =
                response;
              this.getAll();
              $("#editModal").modal("hide");
            } else {
              this.toastrservice.error("Something went wrong");
            }
          }
        },
        (error) => {
          this.onfailservice.onFail(error);
        }
      );
  }
  update(electioncontituencypollingstationresultinformation) {
    if (
      electioncontituencypollingstationresultinformation.candidate_name == ""
    ) {
      electioncontituencypollingstationresultinformation.candidate_ID =
        this.politicalpartycandidateinformationAll[0].candidate_ID;
    } else {
      for (let candidate in this.politicalpartycandidateinformationAll) {
        if (
          electioncontituencypollingstationresultinformation.candidate_name ==
          this.politicalpartycandidateinformationAll[candidate].person_ID
            .forenames
        ) {
          electioncontituencypollingstationresultinformation.candidate_ID =
            this.politicalpartycandidateinformationAll[candidate].candidate_ID;
        }
      }
    }
    if (electioncontituencypollingstationresultinformation.stationName == "") {
      electioncontituencypollingstationresultinformation.pollingstation_ID =
        this.electioncontituencypollingstationinformationAll[0].pollingstation_ID;
    } else {
      for (let station in this
        .electioncontituencypollingstationinformationAll) {
        if (
          electioncontituencypollingstationresultinformation.stationName ==
          this.electioncontituencypollingstationinformationAll[station]
            .description
        ) {
          electioncontituencypollingstationresultinformation.pollingstation_ID =
            this.electioncontituencypollingstationinformationAll[
              station
            ].pollingstation_ID;
        }
      }
    }
    if (electioncontituencypollingstationresultinformation.isactive == true) {
      electioncontituencypollingstationresultinformation.isactive = "Y";
    } else {
      electioncontituencypollingstationresultinformation.isactive = "N";
    }
    if (
      electioncontituencypollingstationresultinformation.electiontype_ID != null
    ) {
      electioncontituencypollingstationresultinformation.electiontype_ID =
        electioncontituencypollingstationresultinformation.electiontype_ID.id;
    } else {
      electioncontituencypollingstationresultinformation.electiontype_ID ==
        null;
    }
    this.electioncontituencypollingstationresultinformationservice
      .update(
        electioncontituencypollingstationresultinformation,
        electioncontituencypollingstationresultinformation.pollingstationresult_ID
      )
      .subscribe(
        (response) => {
          if (response) {
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.pollingstationresult_ID) {
              this.toastrservice.success("Success");
              this.toastrservice.info("Polling Station Result Updated");
              this.electioncontituencypollingstationresultinformation =
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
}
