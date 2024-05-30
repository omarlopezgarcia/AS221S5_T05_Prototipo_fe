import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ICategories } from '../categories/model/categories.model';
import { CountryService } from './service/country.service';
import { ICountry } from './model/country.model';
import { CountrySaveComponent } from './components/country-save/country-save.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styles: [
  ]
})
export class CountryComponent implements AfterViewInit, OnInit {

  private bsModalRef?: BsModalRef;
  displayedColumns: string[] = ['names', 'code', 'accion'];
  dataSource = new MatTableDataSource<ICategories>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  txtStatus: string = "Inactivos";

  constructor(private countryService: CountryService, private _liveAnnouncer: LiveAnnouncer, private modalService: BsModalService, private toastr: ToastrService) {}
  
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

  getAll(){
    this.countryService.getAll().subscribe((res) => {
      this.dataSource.data = res;
    })
  }

  getActive(){
    this.countryService.getActive().subscribe((res) => {
      this.dataSource.data = res;
      this.txtStatus="Inactivos";
    })
  }

  getInactive(){
    this.countryService.getInactive().subscribe((res) => {
      this.dataSource.data = res;
      this.txtStatus="Activos";
    })
  }

  /* removed(content: ICountry){
    Swal.fire({
      title: 'Quieres eliminar este registro?',
      text: 'Se eliminará la nacionalidad '+content.names,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.countryService.removed(content.id).subscribe(() => {
          this.toastr.success('La nacionalidad se desactivo correctamente!', 'Nacionalidad eliminada');
          this.getActive();
        });
      }
    });
  } */

  /* restore(content: ICountry){
    Swal.fire({
      title: 'Quieres restaurar este registro?',
      text: 'Se restaurará la nacionalidad '+content.names,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, restauralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.countryService.restore(content.id).subscribe(() => {
          this.toastr.success('La nacionalidad se restauro correctamente!','Nacionalidad activa');
          this.getInactive();
        })
      }
    });
  } */

  deleteCountry(content: ICountry){
    Swal.fire({
      title: 'Quieres eliminar este registro?',
      text: 'Se eliminará la nacionalidad '+content.names,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.countryService.delete(content.id).subscribe(() => {
          this.toastr.success('La nacionalidad se elimino correctamente!','Nacionalidad eliminada');
          this.getAll();
        })
      }
    });
  }

  openSaveModal(country?: ICountry) {
    const initialState: ModalOptions = {
      initialState: {country}
    };
    this.bsModalRef = this.modalService.show(CountrySaveComponent, initialState);
    this.bsModalRef.onHidden?.subscribe(() => this.getAll());
  }

}
