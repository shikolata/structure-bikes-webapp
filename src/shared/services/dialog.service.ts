import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../components/confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  openConfirmDialog(confirmationMessage: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: {
        message: confirmationMessage
      }
    });
  }
}
