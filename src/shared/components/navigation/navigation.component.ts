import { Component, OnInit } from '@angular/core';
import {Page} from "../../constants";
import {Observable} from "rxjs";
import {StructureBikesFacade} from "../../../store/structure-bikes.facade";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  page = Page;
  currentPage$: Observable<Page> = this.structureBikesFacade.currentPage$;

  constructor(private structureBikesFacade: StructureBikesFacade) {}

  ngOnInit(): void {
  }

}
