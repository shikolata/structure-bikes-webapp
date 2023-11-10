import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Bike} from "../../shared/models/bike";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {StructureBikesFacade} from "../../store/structure-bikes.facade";
import {Page} from "../../shared/constants";
import {Observable, skipWhile} from "rxjs";
import {first, map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-bikes',
  templateUrl: './search-bikes.component.html',
  styleUrls: ['./search-bikes.component.scss']
})
export class SearchBikesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['make', 'name', 'year', 'rating'];
  bikes$: Observable<Bike[]> = this.structureBikesFacade.bikes$;
  dataSource: MatTableDataSource<Bike>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private structureBikesFacade: StructureBikesFacade,
              private router: Router) { }

  ngOnInit(): void {
    this.structureBikesFacade.setCurrentPage(Page.SEARCH_BIKES);
    this.structureBikesFacade.incrementBikes();
  }

  ngAfterViewInit() {
    this.bikes$.pipe(
      skipWhile((bikes: Bike[]) => !bikes || bikes.length === 0),
      first(),
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

}
