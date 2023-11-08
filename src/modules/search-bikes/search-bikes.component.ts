import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Bike} from "../../shared/models/bike";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-search-bikes',
  templateUrl: './search-bikes.component.html',
  styleUrls: ['./search-bikes.component.scss']
})
export class SearchBikesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['make', 'name', 'year', 'rating'];
  dataSource: MatTableDataSource<Bike> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngAfterViewInit() {
    const bikes: Bike[] = [{
      id: 1,
      name: "testBikeName",
      year: "1999",
      make: "testBikeMake",
      model: "testBikeModel",
      description: "testBikeDescription",
      rating: "testBikeRating",
      price: "testBikePrice",
      quantity: 100,
      category: "testBikeCategory"
    }]
    this.dataSource = new MatTableDataSource(bikes)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
