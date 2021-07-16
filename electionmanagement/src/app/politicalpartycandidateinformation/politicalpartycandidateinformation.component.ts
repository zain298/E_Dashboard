import { Component, OnInit } from "@angular/core";
import { OnFailService } from "../services/on-fail.service";
import { PoliticalpartycandidateinformationService } from "../politicalpartycandidateinformation/politicalpartycandidateinformation.service";
import { PersoninformationService } from "../personinformation/personinformation.service";
import { ToastrService } from "ngx-toastr";
import { ElectioncontituencyinformationService } from "../electioncontituencyinformation/electioncontituencyinformation.service";
import { PoliticalpartyinformationService } from "../politicalpartyinformation/politicalpartyinformation.service";

import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: "app-politicalpartycandidateinformation",
  templateUrl: "./politicalpartycandidateinformation.component.html",
  styleUrls: ["./politicalpartycandidateinformation.component.css"],
})
export class PoliticalpartycandidateinformationComponent implements OnInit {
  entitylist = [];
  politicalpartycandidateinformationAll = [];
  personinformationAll = [];
  contituencyinformationAll = [];
  politicalpartyinformationAll = [];
  electiontypeActive = [];
  politicalpartycandidateinformation = {
    candidate_ID: 0,
    // forenames: "",
    // surname: "",
    person_name: "",
    // description: "", //province
    // electiontype_ID: {},
    politicalparty_NAME: "",
    // contituency_DESC: "",
    contituency_CODE: "",
    // politicalpartyleader_NAME: "",
    // politicalpartyleader_DESINATION: "",
    // politicalparty_SYMBOL: "",
    // politicalparty_ADDRESS: "",
    //description: "", //assembly
    contituency_ID: 0,
    person_ID: 0,
    politicalparty_ID: 0,
    isactive: true,
  };
  orderno = [];
  constructor(
    private politicalpartycandidateinformationservice: PoliticalpartycandidateinformationService,
    private onfailservice: OnFailService,
    private personinformationservice: PersoninformationService,
    private electioncontituencyinformationservice: ElectioncontituencyinformationService,
    private politicalpartyinformationservice: PoliticalpartyinformationService,

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

  View(politicalpartycandidateinformation) {
    const url =
      "view/demo/" +
      politicalpartycandidateinformation.data.candidate_ID +
      "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.politicalpartycandidateinformation = {
      candidate_ID: 0,
      person_name: "",
      politicalparty_NAME: "",
      contituency_CODE: "",
      contituency_ID: 0,
      person_ID: 0,
      politicalparty_ID: 0,
      isactive: true,
    };
    this.getAllPersons();
    this.getAllContituencies();
    this.getAllPoliticalParties();
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
            this.contituencyinformationAll = response;
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }
  getAllPoliticalParties() {
    this.politicalpartyinformationservice.getAll().subscribe(
      (response) => {
        if (response) {
          console.log(response);
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else {
            this.politicalpartyinformationAll = response;
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }
  getAllPersons() {
    this.personinformationservice.getAll().subscribe(
      (response) => {
        if (response) {
          console.log(response);
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else {
            this.personinformationAll = response;
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }
  uploadorder() {
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.politicalpartycandidateinformation = {
      candidate_ID: row.data.candidate_ID,
      person_name:
        row.data.person_ID.forenames + " " + row.data.person_ID.surname,
      politicalparty_NAME: row.data.politicalparty_ID.politicalparty_NAME,
      contituency_CODE: row.data.contituency_ID.contituency_CODE,
      contituency_ID: row.data.contituency_ID.contituency_ID,
      person_ID: row.data.person_ID.person_ID,
      politicalparty_ID: row.data.politicalparty_ID.politicalparty_ID,
      isactive: true,
    };
    if (row.data.isactive == "Y") {
      this.politicalpartycandidateinformation.isactive = true;
    } else {
      this.politicalpartycandidateinformation.isactive = false;
    }
    this.getAllPersons();
    this.getAllContituencies();
    this.getAllPoliticalParties();
    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
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

  add(politicalpartycandidateinformation) {
    if (politicalpartycandidateinformation.contituency_CODE == "") {
      politicalpartycandidateinformation.contituency_ID =
        this.contituencyinformationAll[0].contituency_ID;
    } else {
      for (let contituency in this.contituencyinformationAll) {
        if (
          politicalpartycandidateinformation.contituency_CODE ==
          this.contituencyinformationAll[contituency].contituency_CODE
        ) {
          politicalpartycandidateinformation.contituency_ID =
            this.contituencyinformationAll[contituency].contituency_ID;
        }
      }
    }
    if (politicalpartycandidateinformation.person_name == "") {
      politicalpartycandidateinformation.person_ID =
        this.personinformationAll[0].person_ID;
    } else {
      for (let person in this.personinformationAll) {
        if (
          politicalpartycandidateinformation.person_name ==
          this.personinformationAll[person].forenames +
            this.personinformationAll[person].surname
        ) {
          politicalpartycandidateinformation.person_ID =
            this.personinformationAll[person].person_ID;
        }
      }
    }
    if (politicalpartycandidateinformation.politicalparty_NAME == "") {
      politicalpartycandidateinformation.politicalparty_ID =
        this.politicalpartyinformationAll[0].politicalparty_ID;
    } else {
      for (let party in this.politicalpartyinformationAll) {
        if (
          politicalpartycandidateinformation.politicalparty_NAME ==
          this.politicalpartyinformationAll[party].politicalparty_NAME
        ) {
          politicalpartycandidateinformation.politicalparty_ID =
            this.politicalpartyinformationAll[party].politicalparty_ID;
        }
      }
    }
    this.politicalpartycandidateinformationservice
      .add(politicalpartycandidateinformation)
      .subscribe(
        (response) => {
          if (response) {
            console.log(response);

            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.candidate_ID) {
              this.toastrservice.success("Success");
              this.toastrservice.info("New Candidate Information Added");
              this.politicalpartycandidateinformation = response;
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
    this.politicalpartycandidateinformationservice
      .delete(row.data.candidate_ID)
      .subscribe(
        (response) => {
          if (response) {
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.candidate_ID) {
              this.toastrservice.success("Success");
              this.toastrservice.info("Candidate Information Deleted");
              this.politicalpartycandidateinformation = response;
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
  update(politicalpartycandidateinformation) {
    if (politicalpartycandidateinformation.contituency_CODE == "") {
      politicalpartycandidateinformation.contituency_ID =
        this.contituencyinformationAll[0].contituency_ID;
    } else {
      for (let contituency in this.contituencyinformationAll) {
        if (
          politicalpartycandidateinformation.contituency_CODE ==
          this.contituencyinformationAll[contituency].contituency_CODE
        ) {
          politicalpartycandidateinformation.contituency_ID =
            this.contituencyinformationAll[contituency].contituency_ID;
        }
      }
    }
    let personName = politicalpartycandidateinformation.person_name.split(" ");
    let completeName = personName[0] + personName[1];
    if (politicalpartycandidateinformation.person_name == "") {
      politicalpartycandidateinformation.person_ID =
        this.personinformationAll[0].person_ID;
    } else {
      for (let person in this.personinformationAll) {
        if (
          completeName ==
          this.personinformationAll[person].forenames +
            this.personinformationAll[person].surname
        ) {
          politicalpartycandidateinformation.person_ID =
            this.personinformationAll[person].person_ID;
        }
      }
    }
    if (politicalpartycandidateinformation.politicalparty_NAME == "") {
      politicalpartycandidateinformation.politicalparty_ID =
        this.politicalpartyinformationAll[0].politicalparty_ID;
    } else {
      for (let party in this.politicalpartyinformationAll) {
        if (
          politicalpartycandidateinformation.politicalparty_NAME ==
          this.politicalpartyinformationAll[party].politicalparty_NAME
        ) {
          politicalpartycandidateinformation.politicalparty_ID =
            this.politicalpartyinformationAll[party].politicalparty_ID;
        }
      }
    }
    if (politicalpartycandidateinformation.isactive == true) {
      politicalpartycandidateinformation.isactive = "Y";
    } else {
      politicalpartycandidateinformation.isactive = "N";
    }
    if (politicalpartycandidateinformation.electiontype_ID != null) {
      politicalpartycandidateinformation.electiontype_ID =
        politicalpartycandidateinformation.electiontype_ID.id;
    } else {
      politicalpartycandidateinformation.electiontype_ID == null;
    }
    this.politicalpartycandidateinformationservice
      .update(
        politicalpartycandidateinformation,
        politicalpartycandidateinformation.candidate_ID
      )
      .subscribe(
        (response) => {
          if (response) {
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.candidate_ID) {
              this.toastrservice.success("Success");
              this.toastrservice.info("Candidate Information Updated");
              this.politicalpartycandidateinformation = response;
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
  //   this.lookupservice.lookup("electionTYPE").subscribe(response => {
  //     if(response) {
  //       if (response.error && response.status) {
  //         this.toastrservice.warning("Message", " " + response.message);
  //       } else {
  //         this.electiontypeActive = response;
  //       }
  //     }
  //   }, error => {
  //     this.onfailservice.onFail(error);
  //   })
  // }
}
