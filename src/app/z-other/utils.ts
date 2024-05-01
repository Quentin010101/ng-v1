export class Utils{
  public static dateToDateString(d:Date): string{
    return new Date(d).toLocaleDateString("fr-FR")
  }
  public static dateToTimeString(d:Date): string{
    return new Date(d).toLocaleTimeString("fr-FR")
  }
}