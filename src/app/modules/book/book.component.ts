import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { IAuthor } from '../author/model/author.model';
import { ICategories } from '../categories/model/categories.model';
import Swal from 'sweetalert2';
import { IBook } from './model/book.model';
import { BookService } from './service/book.service';
import { BookSaveComponent } from './components/book-save/book-save.component';
import { ExportService } from './service/export.service';
import { PreviewDialogComponent } from './bookView/preview-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styles: [
  ]
})
export class BookComponent implements AfterViewInit, OnInit {

  private bsModalRef?: BsModalRef;
  displayedColumns: string[] = ['title', 'stock', 'isbn', 'category', 'author', 'urldownload', 'description', 'accion'];
  dataSource = new MatTableDataSource<IBook>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  txtStatus: string = "Inactivos";

  constructor(public dialog: MatDialog, private exportService: ExportService, private bookService: BookService, private _liveAnnouncer: LiveAnnouncer, private modalService: BsModalService, private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.getActive();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = "Registros Por Pagina";
    this.paginator._intl.firstPageLabel = "Primera página";
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Pagina anterior";
    this.paginator._intl.lastPageLabel = "Última página";
  }

  exportToExcel(): void {
    const dataToExport = this.dataSource.data;
    this.exportService.exportToExcel(dataToExport, 'booksBibliotech');
  }

  exportToCSV(): void {
    const dataToExport = this.dataSource.data;
    this.exportService.exportToCSV(dataToExport, 'booksBibliotech');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleStatus(){
    if (this.txtStatus=="Inactivos") {
      this.getInactive();
    } else {
      this.getActive();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getActive(){
    this.bookService.getActive().subscribe((res) => {
      this.dataSource.data = res;
      this.txtStatus="Inactivos";
    })
  }

  getInactive(){
    this.bookService.getInactive().subscribe((res) => {
      this.dataSource.data = res;
      this.txtStatus="Activos";
    })
  }

  removed(content: IBook){
    Swal.fire({
      title: 'Quieres eliminar este registro?',
      text: 'Se eliminará el libro '+content.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.removed(content.id).subscribe(() => {
          this.toastr.success('El libro se desactivo correctamente!', 'Libro eliminado');
          this.getActive();
        });
      }
    });
  }

  restore(content: IBook){
    Swal.fire({
      title: 'Quieres restaurar este registro?',
      text: 'Se restaurará el libro '+content.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, restauralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.restore(content.id).subscribe(() => {
          this.toastr.success('El libro se restauro correctamente!','Libro activo');
          this.getInactive();
        })
      }
    });
  }

  deleteUser(content: IBook){
    Swal.fire({
      title: 'Quieres eliminar este registro?',
      text: 'Se eliminará el libro '+content.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.delete(content.id).subscribe(() => {
          this.toastr.success('El libro se elimino correctamente!','Libro eliminado');
          this.getInactive();
        })
      }
    });
  }

  openSaveModal(book?: IBook) {
    const initialState: ModalOptions = {
      initialState: {book}
    };
    this.bsModalRef = this.modalService.show(BookSaveComponent, initialState);
    this.bsModalRef.onHidden?.subscribe(() => this.getActive());
  }

  openPreview(url: string): void {
    this.dialog.open(PreviewDialogComponent, {
      data: { url: url }
    });
  }

}
