import {Component, OnInit} from '@angular/core';
import {Pointer} from '../../classes/pointer.class';
import {MatDialog, MatSnackBar} from '@angular/material';
import {EditMapComponent} from './edit-map.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public pointers: Pointer[];

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {
    if (localStorage.getItem('pointers')) {
      this.pointers = JSON.parse(localStorage.getItem('pointers'));
    } else {
      this.pointers = [];
    }
  }

  ngOnInit() {
  }

  createPointer(newCoords) {
    const newPointer: Pointer = new Pointer(newCoords.coords.lat, newCoords.coords.lng);
    this.pointers.push(newPointer);
    this.saveToLocalStorage();
  }

  editPointer(pointer: Pointer) {
    const dialogRef = this.dialog.open(EditMapComponent, {
      width: '250px',
      data: {title: pointer.title, description: pointer.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.updatePointerParams(result, pointer);
    });
  }

  updatePointerParams(newParams: any, pointer: Pointer) {
    pointer.title = newParams.title;
    pointer.description = newParams.description;
    this.saveToLocalStorage();
  }

  removePointer(index) {
    const tempPointer: Pointer = this.pointers[index];
    this.pointers.splice(index, 1);
    this.saveToLocalStorage();
    const snackBarRef = this.snackBar.open('Pointer removed', 'undo', {duration: 4000});
    snackBarRef.onAction().subscribe(() => {
      this.pointers.push(tempPointer);
      this.saveToLocalStorage();
    });
  }

  saveToLocalStorage() {
    localStorage.setItem('pointers', JSON.stringify(this.pointers));
  }

}
