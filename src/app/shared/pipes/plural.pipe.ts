import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
  pure: true
})
export class PluralPipe implements PipeTransform {

  transform(
    num: number | string, 
    form1: string,
    form2: string,
    form3: string): string {
    const count: number = typeof num === 'number'? num : Number(num);
    if(count % 10 === 1) {
      return `${ count } ${ form1 }`;
    } else if(count % 10 >= 2 && count % 10 <= 4) {
        return `${ count } ${ form2 }`;
    } else {
        return `${ count } ${ form3 }`;
    }
  }

}
