export class MathUtils {

  public static roundDown(number: number, precision: number) {
    let returnValue = 0;
    if (precision < 0) {
      let factor = Math.pow(10, precision);
      returnValue = Math.floor(number * factor) / factor;
    }
    else
      returnValue = +(Math.floor(Number(number + "e+" + precision)) +
        "e-" + precision);
    return Number.isNaN(returnValue) ? 0 : returnValue;
  }


  public static timeConverter(timestamp: number, additionalDays: number = 0, multiply = true){
    var a = new Date(timestamp * (multiply ? 1000 : 1));
    a.setDate(a.getDate() + additionalDays);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
}
