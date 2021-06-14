import { Injectable } from "@angular/core";
import { setting } from "../setting";
import { HttpCallServieService } from "../services/http-call-servie.service";

@Injectable({
  providedIn: "root",
})
export class EventspageService {
  constructor(private _HttpCallServieService_: HttpCallServieService) {}
}
