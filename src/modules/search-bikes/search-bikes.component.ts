import {Component, OnDestroy, OnInit, ViewChild, inject} from '@angular/core';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import {Bike} from "../../shared/models/bike";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import {StructureBikesFacade} from "../../store/structure-bikes.facade";
import {Page} from "../../shared/constants";
import {Observable, skipWhile, Subscription} from "rxjs";
import {first, map} from "rxjs/operators";
import {Router} from "@angular/router";
import {DialogService} from "../../shared/services/dialog.service";
import { TranslateModule } from '@ngx-translate/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WeatherWidgetComponent } from '../../shared/components/weather-widget/weather-widget.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { LanguageSelectorComponent } from '../../shared/components/language-selector/language-selector.component';

@Component({
    selector: 'app-search-bikes',
    templateUrl: './search-bikes.component.html',
    styleUrls: ['./search-bikes.component.scss'],
    standalone: true,
    imports: [LanguageSelectorComponent, NavigationComponent, MatFormFieldModule, MatInputModule, WeatherWidgetComponent, MatTableModule, MatSortModule, MatButtonModule, MatIconModule, NgIf, MatPaginatorModule, AsyncPipe, TranslateModule]
})
export class SearchBikesComponent implements OnInit, OnDestroy {
  private structureBikesFacade: StructureBikesFacade = inject(StructureBikesFacade);
  private router: Router = inject(Router);
  private dialogService: DialogService = inject(DialogService);

  displayedColumns: string[] = ['make', 'name', 'year', 'rating', 'id'];
  bikes$: Observable<Bike[]> = this.structureBikesFacade.bikes$;
  dataSource: MatTableDataSource<Bike>;
  bikesSubscription: Subscription;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.structureBikesFacade.setCurrentPage(Page.SEARCH_BIKES);
    this.structureBikesFacade.incrementBikes();

    this.bikesSubscription = this.bikes$.pipe(
      skipWhile((bikes: Bike[]) => !bikes || bikes.length === 0),
      map((bikes: Bike[]) => {
        this.dataSource = new MatTableDataSource(bikes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    ).subscribe();
  }

  navigateToBike(bikeId: number): void {
    this.bikes$.pipe(
      first(),
      map((bikes: Bike[]) => {
        const selectedBike: Bike | undefined = bikes.find(bike => bike.id === bikeId);
        if(!!selectedBike) {
          this.structureBikesFacade.setSelectedBike(selectedBike);
        }
      })
    ).subscribe();
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
          this.structureBikesFacade.deleteBike(elementId);
        }
    });
  }

  ngOnDestroy() {
    this.bikesSubscription.unsubscribe();
  }
}
