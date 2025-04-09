import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  constructor() {}

  transform(value: number): string {
    if (!value) {
      value = 0;
    }
    return this.getTimeString(value);
  }

  private getTimeString(duration: number): string {
    const hours = +(duration / 60).toFixed(0);
    const minutes = duration % 60;
    return hours > 0
      ? `${hours} ${this.getTimeWord(
          hours,
          'hours'
        )} ${minutes} ${this.getTimeWord(minutes)}`
      : `${minutes} ${this.getTimeWord(minutes)}`;
  }

  private getTimeWord(num: number, type?: string): string {
    let word: string;
    let numToStr = String(num);
    let latestSymbol = numToStr[numToStr.length - 1];
    if (numToStr[numToStr.length - 2] != '1') {
      switch (Number(latestSymbol)) {
        case 0:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          word = type === 'hours' ? 'часов' : 'минут';
          break;
        case 1:
          word = type === 'hours' ? 'час' : 'минута';
          break;
        case 2:
        case 3:
        case 4:
          word = type === 'hours' ? 'часа' : 'минуты';
          break;
        default:
          word = type === 'hours' ? 'часа' : 'минуты';
      }
    } else {
      word = type === 'hours' ? 'часов' : 'минут';
    }
    return word;
  }
}
