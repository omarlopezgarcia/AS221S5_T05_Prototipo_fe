import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ICountry } from '../country/model/country.model';
import Swal from 'sweetalert2';
import { IAuthor } from './model/author.model';
import { AuthorService } from './service/author.service';
import { AuthorSaveComponent } from './components/author-save/author-save.component';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styles: [
  ]
})
export class AuthorComponent implements AfterViewInit, OnInit {

  private bsModalRef?: BsModalRef;
  displayedColumns: string[] = ['fullname', 'country', 'accion'];
  dataSource = new MatTableDataSource<IAuthor>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  txtStatus: string = "Inactivos";

  constructor(private authorService: AuthorService, private _liveAnnouncer: LiveAnnouncer, private modalService: BsModalService, private toastr: ToastrService) {}
  
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
    this.authorService.getActive().subscribe((res) => {
      this.dataSource.data = res;
      this.txtStatus="Inactivos";
    })
  }

  getInactive(){
    this.authorService.getInactive().subscribe((res) => {
      this.dataSource.data = res;
      this.txtStatus="Activos";
    })
  }

  removed(content: IAuthor){
    Swal.fire({
      title: 'Quieres eliminar este registro?',
      text: 'Se eliminará el autor '+content.fullname,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authorService.removed(content.id).subscribe(() => {
          this.toastr.success('El autor se desactivo correctamente!', 'Autor eliminado');
          this.getActive();
        });
      }
    });
  }

  restore(content: IAuthor){
    Swal.fire({
      title: 'Quieres restaurar este registro?',
      text: 'Se restaurará el autor '+content.fullname,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, restauralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authorService.restore(content.id).subscribe(() => {
          this.toastr.success('El autor se restauro correctamente!','Autor activo');
          this.getInactive();
        })
      }
    });
  }

  deleteUser(content: IAuthor){
    Swal.fire({
      title: 'Quieres eliminar este registro?',
      text: 'Se eliminará el author '+content.fullname,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authorService.delete(content.id).subscribe(() => {
          this.toastr.success('El author se elimino correctamente!','Author eliminado');
          this.getInactive();
        })
      }
    });
  }

  openSaveModal(author?: IAuthor) {
    const initialState: ModalOptions = {
      initialState: {author}
    };
    this.bsModalRef = this.modalService.show(AuthorSaveComponent, initialState);
    this.bsModalRef.onHidden?.subscribe(() => this.getActive());
  }

}
