import { Directive, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LocaleSettings } from 'primeng/calendar';

@Directive({
  selector: '[localizedCalendar]',
  standalone: true,
})
export class LocalizedCalendarDirective implements OnInit {
  ruLocale = {
    locale: {
      firstDayOfWeek: 1,
      dayNames: [
        'Воскреснье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
      ],
      dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      monthNamesShort: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
      ],
      today: 'Сегодня',
      clear: 'Очистить',
    } as LocaleSettings,
  };

  constructor(private primeNGConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primeNGConfig.setTranslation(this.ruLocale.locale);
  }
}
