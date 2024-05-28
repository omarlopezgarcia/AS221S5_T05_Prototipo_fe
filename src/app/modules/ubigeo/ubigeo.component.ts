import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IUbigeo } from './model/ubigeo.model';
import { MatPaginator } from '@angular/material/paginator';
import { UbigeoService } from './service/ubigeo.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { UbigeoSaveComponent } from './components/ubigeo-save/ubigeo-save.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ubigeo',
  templateUrl: './ubigeo.component.html',
  styles: [
  ]
})
export class UbigeoComponent implements AfterViewInit, OnInit {

  private bsModalRef?: BsModalRef;
  displayedColumns: string[] = ['district', 'province', 'department', 'accion'];
  dataSource = new MatTableDataSource<IUbigeo>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ubigeoService: UbigeoService, private _liveAnnouncer: LiveAnnouncer, private modalService: BsModalService, private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.getAll();
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getAll(){
    this.ubigeoService.getAll().subscribe((res) => {
      this.dataSource.data = res;
    })
  }

  deleteUbigeo(content: IUbigeo){
    Swal.fire({
      title: 'Quieres eliminar este registro?',
      text: 'Se eliminará el siguiente ubigeo: '+content.district+', '+content.province+', '+content.department,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ubigeoService.delete(content.id).subscribe((res) => {
          this.toastr.success('El ubigeo se elimino correctamente!','Ubigeo eliminado');
          this.getAll();
        })
      }
    });
  }

  openSaveModal(ubigeo?: IUbigeo) {
    const initialState: ModalOptions = {
      initialState: {ubigeo}
    };
    this.bsModalRef = this.modalService.show(UbigeoSaveComponent, initialState);
    this.bsModalRef.onHidden?.subscribe(() => this.getAll());
  }

}
