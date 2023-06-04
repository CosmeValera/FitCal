import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      const itemName = item.name.toLowerCase();
      return itemName.includes(searchText);
    });
  }
}
