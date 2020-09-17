import _ from 'lodash';
import { Pagination } from './pagination';
import { MatchedProvider } from './matched_provider';

export class MatchedProviderList {
  rows: MatchedProvider[];
  pagination: Pagination;

  constructor(values: object = {}) {
    Object.assign(this, values);
    this.setRowNum();
  }

  setRowNum() {
    let rowNo = this.pagination.firstRowNo || 0;
    if (this.rows.length > 0) {
      _.map(this.rows, (row: any) => {
        row.row_num = rowNo--;
        return row;
      });
    }
  }
}
