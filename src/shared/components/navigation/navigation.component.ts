import { Component, OnInit, Signal, inject } from '@angular/core';
import {Page} from "../../constants";
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignalStoreProps } from '@ngrx/signals/src/signal-store-models';
import { StructureBikesStore } from 'src/store/sturucture-bikes.store';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: true,
    imports: [
      MatToolbarModule, 
      MatButtonModule, 
      MatMenuModule, 
      MatIconModule, 
      RouterLink, 
      TranslateModule
    ]
})
export class NavigationComponent implements OnInit {
  private structureBikesStore: SignalStoreProps<any> = inject(StructureBikesStore);

  page = Page;
  currentPage: Signal<Page> = this.structureBikesStore.currentPage;

  ngOnInit(): void {
  }
}
