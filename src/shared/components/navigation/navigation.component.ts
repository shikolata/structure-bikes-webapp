import { Component, OnInit } from '@angular/core';
import {Page} from "../../constants";
import {Observable} from "rxjs";
import {StructureBikesFacade} from "../../../store/structure-bikes.facade";
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, RouterLink, AsyncPipe, TranslateModule]
})
export class NavigationComponent implements OnInit {
  page = Page;
  currentPage$: Observable<Page> = this.structureBikesFacade.currentPage$;

  constructor(private structureBikesFacade: StructureBikesFacade) {}

  ngOnInit(): void {
  }

}
