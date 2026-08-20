import { Pipe, PipeTransform } from '@angular/core';
import { PhoneFormat } from '../../../enum/PhoneFormat';

@Pipe({
  name: 'formatPhone',
})
export class FormatPhonePipe implements PipeTransform {

  transform(phone: string, mode: PhoneFormat): string {
    const cleanPhone: string = phone.replace(/\D/g, '');
    const mainPhoneNumber: string =  
      `${ cleanPhone.slice(0, 2) } 
      ${ cleanPhone.slice(2, 5) } 
      ${ cleanPhone.slice(5, 8) } 
      ${ cleanPhone.slice(8, 10) } 
      ${ cleanPhone.slice(10) }`;

    if (cleanPhone.length === 0) {
      return '';
    } 

    switch (mode) {
      case PhoneFormat.COMPACT:
        return '+' + cleanPhone;    
        break;
      case PhoneFormat.INTERNATIONAL:
        return "+" + mainPhoneNumber;
        break;
      case PhoneFormat.NATIONAL:
        return mainPhoneNumber.slice(2);
        break;
      case PhoneFormat.MASKED:
        return "+" + `${ cleanPhone.slice(0, 2) }
        ${ cleanPhone.slice(2, 5) } 
        ${ cleanPhone.slice(5, 10).replace(/\d/g, '*') }
        ${ cleanPhone.slice(10) }`;  
      default:
        return '+' + mainPhoneNumber.split(' ').join(''); 
        break;
    }

  }
}