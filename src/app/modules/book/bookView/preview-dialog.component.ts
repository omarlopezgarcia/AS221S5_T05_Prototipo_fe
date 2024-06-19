import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-preview-dialog',
  templateUrl: './preview-dialog.component.html',
})
export class PreviewDialogComponent implements OnInit {
  public safeUrl!: SafeResourceUrl;

  constructor(
    public dialogRef: MatDialogRef<PreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { url: string },
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
