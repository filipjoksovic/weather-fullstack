import { Pipe, type PipeTransform } from '@angular/core';
import { ValueUnit } from '../models/data/value-unit.type';

@Pipe({
  name: 'appUnitValueToString',
  standalone: true,
})
export class UnitValueToStringPipe implements PipeTransform {
  transform(value: ValueUnit<number, string>): string {
    return value.value.toString() + value.unit.toString();
  }
}
