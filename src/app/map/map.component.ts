import {Component, OnInit} from '@angular/core';
import {Pointer} from '../classes/pointer.class';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public pointers: Pointer[];

  constructor(private snackBar: MatSnackBar) {
    if (localStorage.getItem('pointers')) {
      this.pointers = JSON.parse(localStorage.getItem('pointers'));
    } else {
      this.pointers = [];
    }
  }

  ngOnInit() {
  }

  createPointer(newCoords) {
    console.log('Coords ', newCoords);
    const newPointer: Pointer = new Pointer(newCoords.coords.lat, newCoords.coords.lng);
    this.pointers.push(newPointer);
    this.saveToLocalStorage();
  }

  removePointer(index) {
    const tempPointer: Pointer = this.pointers[index];
    this.pointers.splice(index, 1);
    this.saveToLocalStorage();
    const snackBarRef = this.snackBar.open('Pointer removed', 'undo', {duration: 4000});
    snackBarRef.onAction().subscribe(() => {
      console.log('clicked');
      this.pointers.push(tempPointer);
      this.saveToLocalStorage();
    });
  }

  saveToLocalStorage() {
    localStorage.setItem('pointers', JSON.stringify(this.pointers));
  }

}
