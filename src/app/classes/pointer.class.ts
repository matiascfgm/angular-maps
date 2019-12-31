export class Pointer {
  public lat: number;
  public lng: number;
  public title: string;
  public description: string;

  constructor(public newLat: number, public newLng: number) {
    this.newLat = newLat;
    this.newLng = newLng;
    this.title = 'Add title';
    this.description = 'Write a description...';
  }
}
