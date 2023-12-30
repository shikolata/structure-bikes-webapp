import {Component, OnInit, Signal, ViewChild, effect, inject} from '@angular/core';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import {Bike} from "../../shared/models/bike";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import {Page} from "../../shared/constants";
import {Router} from "@angular/router";
import {DialogService} from "../../shared/services/dialog.service";
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WeatherWidgetComponent } from '../../shared/components/weather-widget/weather-widget.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { LanguageSelectorComponent } from '../../shared/components/language-selector/language-selector.component';
import { SignalStoreProps } from '@ngrx/signals/src/signal-store-models';
import { StructureBikesStore } from 'src/store/sturucture-bikes.store';

@Component({
    selector: 'app-search-bikes',
    templateUrl: './search-bikes.component.html',
    styleUrls: ['./search-bikes.component.scss'],
    standalone: true,
    imports: [
      LanguageSelectorComponent,
      NavigationComponent,
      MatFormFieldModule,
      MatInputModule,
      WeatherWidgetComponent,
      MatTableModule,
      MatSortModule,
      MatButtonModule,
      MatIconModule,
      MatPaginatorModule,
      TranslateModule
    ]
})
export class SearchBikesComponent implements OnInit {
  private structureBikesStore: SignalStoreProps<any> = inject(StructureBikesStore);
  private router: Router = inject(Router);
  private dialogService: DialogService = inject(DialogService);

  displayedColumns: string[] = ['make', 'name', 'year', 'rating', 'id'];
  bikes: Signal<Bike[]> = this.structureBikesStore.bikes;
  dataSource: MatTableDataSource<Bike>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  effect = effect(() => {
    if(this.bikes()?.length > 0) {
      this.dataSource = new MatTableDataSource(this.bikes());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  });

  ngOnInit(): void {
    this.structureBikesStore.setCurrentPage(Page.SEARCH_BIKES);
    this.structureBikesStore.incrementBikes();
  }

  navigateToBike(bikeId: number): void {
    const selectedBike: Bike | undefined = this.bikes().find((bike: Bike) => bike.id === bikeId);
    if(!!this.bikes()) {
      this.structureBikesStore.setSelectedBike(selectedBike);
    }
    this.router.navigate(['/view-bike', { id: bikeId }]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(elementId: number): void {
    this.dialogService.openConfirmDialog('search-bikes.delete')
      .afterClosed().subscribe(res => {
        if(res) {
          this.structureBikesStore.deleteBike(elementId);
        }
    });
  }
}
