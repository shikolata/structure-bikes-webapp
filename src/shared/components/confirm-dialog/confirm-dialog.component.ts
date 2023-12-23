import { Component, OnInit, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose } from "@angular/material/dialog";
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    standalone: true,
    imports: [MatIconModule, MatButtonModule, MatDialogClose, TranslateModule]
})
export class ConfirmDialogComponent {
  private data: any = inject(MAT_DIALOG_DATA);
  private dialogRef: MatDialogRef<ConfirmDialogComponent> = inject(MatDialogRef<ConfirmDialogComponent>);

  get confirmationMessage(): string {
    return this.data.message;
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
