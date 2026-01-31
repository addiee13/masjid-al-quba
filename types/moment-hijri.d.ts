
declare module "moment-hijri" {
  import moment from "moment";

  interface HijriMoment extends moment.Moment {
    iYear(): number;
    iMonth(): number;
    iDate(): number;
    iDay(): number;
    iDayOfYear(): number;
    iWeek(): number;
    iWeekYear(): number;
    iYear(y: number): HijriMoment;
    iMonth(M: number): HijriMoment;
    iDate(d: number): HijriMoment;
    startOf(unit: moment.unitOfTime.StartOf): HijriMoment;
    endOf(unit: moment.unitOfTime.StartOf): HijriMoment;
    add(amount: number, unit: moment.unitOfTime.DurationConstructor): HijriMoment;
    subtract(amount: number, unit: moment.unitOfTime.DurationConstructor): HijriMoment;
    format(format?: string): string;
  }

  function momentHijri(): HijriMoment;
  function momentHijri(date: string | number | Date | moment.Moment): HijriMoment;
  function momentHijri(date: string, format: string): HijriMoment;

  export = momentHijri;
}
