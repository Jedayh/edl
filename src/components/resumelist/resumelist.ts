import { Component, ViewChild, OnInit, Renderer, Input } from "@angular/core";
import { PanoData } from "../../models/pano-data.model";
import { NavController } from "ionic-angular";
import { PanoDataProvider } from "../../providers/pano-data/pano-data";

/**
 * Generated class for the ResumelistComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "resumelist",
  templateUrl: "resumelist.html"
})
export class ResumelistComponent implements OnInit {
  expandedList = false;
  lists: any;
  equipement: any[];
  @ViewChild("lc")
  listContent: any;

  @Input() card_title: string;
  @Input() dataPano: PanoData;

  constructor(public renderer: Renderer, public navCtrl: NavController, public panoDataProvider: PanoDataProvider) { }

  ngOnInit() {
    this.renderer.setElementStyle(
      this.listContent.nativeElement,
      "webkitTransition",
      "max-height 500ms, padding 500ms"
    );
    this.toggleResumelist();
  }

  toggleResumelist() {
    if (this.expandedList) {
      this.renderer.setElementStyle(
        this.listContent.nativeElement,
        "max-height",
        "0px"
      );
      this.renderer.setElementStyle(
        this.listContent.nativeElement,
        "padding",
        "0px 16px"
      );
      // card.button.toggle = "arrow-dropdown";
    } else {
      this.renderer.setElementStyle(
        this.listContent.nativeElement,
        "max-height",
        "500px"
      );
      this.renderer.setElementStyle(
        this.listContent.nativeElement,
        "padding",
        "13px 16px"
      );
      // card.button.toggle = "arrow-dropup";
    }
    this.expandedList = !this.expandedList;
  }

}
