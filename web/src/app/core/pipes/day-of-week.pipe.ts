import { Pipe, type PipeTransform } from '@angular/core';
import { format, isDate } from 'date-fns';

@Pipe({
  name: 'appDayOfWeek',
  standalone: true,
})
export class DayOfWeekPipe implements PipeTransform {
  transform(value: string | number): string {
    return format(new Date(value), 'EEEE');
  }
}
