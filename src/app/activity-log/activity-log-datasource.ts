import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
export enum Activity {
  Created = 'Created employee',
  Updated = 'Updated employee',
  Deleted = 'Deleted employee',
  Viewed = 'Viewed employee',
}

function getRandomTimestamp(): Date {
  const start = new Date(2022, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
export interface ActivityLogItem {
  timestamp: Date;
  employeeId: number;
  employeeName: string;
  activity: Activity;
}

const EXAMPLE_DATA: ActivityLogItem[] = [
  {timestamp: getRandomTimestamp(), employeeId: 1, employeeName: 'John Doe', activity: Activity.Created},
  {timestamp: getRandomTimestamp(), employeeId: 2, employeeName: 'Jane Smith', activity: Activity.Updated},
  {timestamp: getRandomTimestamp(), employeeId: 3, employeeName: 'Bob Johnson', activity: Activity.Deleted},
  {timestamp: getRandomTimestamp(), employeeId: 4, employeeName: 'Alice Brown', activity: Activity.Viewed},
];



/**
 * Data source for the ActivityLog view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ActivityLogDataSource extends DataSource<ActivityLogItem> {
  data: ActivityLogItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ActivityLogItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ActivityLogItem[]): ActivityLogItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ActivityLogItem[]): ActivityLogItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }
    return data;
  }
}

