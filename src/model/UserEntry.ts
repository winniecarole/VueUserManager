export class UserEntry {
  static counter = 1
  public id: number;
  public vorname: string;
  public name: string;
  public beschreibung: string;
  public date: Date;

  // constructor
  constructor (vorname: string, name: string, beschreibung: string, id?: number) {
    if(id){
    this.vorname = vorname
    this.name = name
    this.beschreibung = beschreibung
    this.id = id
    this.date = new Date()
    }
    else{
      this.vorname = vorname
    this.name = name
    this.beschreibung = beschreibung
    this.id = UserEntry.counter++
    this.date = new Date()
    }
  }
}
