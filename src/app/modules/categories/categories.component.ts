import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ICategories } from './model/categories.model';
import { CategoriesService } from './service/categories.service';
import { CategoriesSaveComponent } from './components/categories-save/categories-save.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: [
  ]
})
export class CategoriesComponent implements AfterViewInit, OnInit {

  private bsModalRef?: BsModalRef;
  displayedColumns: string[] = ['names', 'accion'];
  dataSource = new MatTableDataSource<ICategories>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  txtStatus: string = "Inactivos";

  constructor(private categoriesService: CategoriesService, private _liveAnnouncer: LiveAnnouncer, private modalService: BsModalService, private toastr: ToastrService) {}
  
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
    this.categoriesService.getActive().subscribe((res) => {
      this.dataSource.data = res;
      this.txtStatus="Inactivos";
    })
  }

  getInactive(){
    this.categoriesService.getInactive().subscribe((res) => {
      this.dataSource.data = res;
      this.txtStatus="Activos";
    })
  }

  removed(content: ICategories){
    Swal.fire({
      title: 'Quieres eliminar este registro?',
      text: 'Se eliminará la categoría '+content.names,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriesService.removed(content.id).subscribe(() => {
          this.toastr.success('La categoria se desactivo correctamente!', 'Categoria eliminada');
          this.getActive();
        });
      }
    });
  }

  restore(content: ICategories){
    Swal.fire({
      title: 'Quieres restaurar este registro?',
      text: 'Se restaurará la categoria '+content.names,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, restauralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriesService.restore(content.id).subscribe(() => {
          this.toastr.success('La categoría se restauro correctamente!','Categoria activa');
          this.getInactive();
        })
      }
    });
  }

  deleteUser(content: ICategories){
    Swal.fire({
      title: 'Quieres eliminar este registro?',
      text: 'Se eliminará la categoría '+content.names,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriesService.delete(content.id).subscribe(() => {
          this.toastr.success('La categoria se elimino correctamente!','Categoria eliminada');
          this.getInactive();
        })
      }
    });
  }

  openSaveModal(categories?: ICategories) {
    const initialState: ModalOptions = {
      initialState: {categories}
    };
    this.bsModalRef = this.modalService.show(CategoriesSaveComponent, initialState);
    this.bsModalRef.onHidden?.subscribe(() => this.getActive());
  }

}
