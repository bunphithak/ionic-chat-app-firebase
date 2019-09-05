import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], args?: any): any[] {
    if (!items) {
      return [];
    }

    if (!args['term']) {
      return items;
    }

    const search = args['term'].toLowerCase();
    return items.filter(it => {
      if (!args['field']) {
        return it.toLowerCase().includes(search);
      } else {
        return it[args['field']].toLowerCase().includes(search);
      }
    });
  }

}
