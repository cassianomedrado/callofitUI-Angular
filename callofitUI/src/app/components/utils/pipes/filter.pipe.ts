import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filtro: any): any[] {
    if (!filtro) {
      return items;
    }
    return items.filter(item => {
      for (let key in filtro) {
        if (filtro[key] !== undefined && filtro[key] !== null) {
          let value = item[key];
          let valueType = typeof value;
          let filterValue = filtro[key];
          let filterValueType = typeof filterValue;
          if (filterValueType !== valueType) {
            filterValue = filterValueType === 'string' ? filterValue : filterValue.toString();
            value = valueType === 'string' ? value : value.toString();
          }
          if (!value.toLowerCase().includes(filterValue.toLowerCase())) {
            return false;
          }
        }
      }
      return true;
    });
  }
}
