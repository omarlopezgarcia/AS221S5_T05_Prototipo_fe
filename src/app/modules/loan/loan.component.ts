import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UserSaveComponent } from '../user/components/user-save/user-save.component';
import { IUser } from '../user/model/user.model';
import { ExportService } from '../user/service/export.service';
import { UserService } from '../user/service/user.service';
import { ILoan } from './models/loan.model';
import { LoanService } from './services/loan.service';
import { LoanSaveComponent } from './components/loan-save/loan-save.component';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styles: [
  ]
})
export class LoanComponent implements AfterViewInit, OnInit {

  private bsModalRef?: BsModalRef;
  displayedColumns: string[] = ['user', 'librarian', 'startDate', 'returnDate', 'accion'];
  dataSource = new MatTableDataSource<ILoan>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  txtStatus: string = "Devoluciones";

  constructor(private LoanService: LoanService, private _liveAnnouncer: LiveAnnouncer, private modalService: BsModalService, private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.getBorrowed();
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
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = (data: ILoan, filter: string) => {
      const userMatch = data.user.names.toLowerCase().includes(filter) || data.user.lastName.toLowerCase().includes(filter);
      const librarianMatch = data.librarian.names.toLowerCase().includes(filter) || data.librarian.lastName.toLowerCase().includes(filter);
      return userMatch || librarianMatch;
    };
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  

  toggleStatus(){
    if (this.txtStatus=="Devoluciones") {
      this.getReturned();
    } else {
      this.getBorrowed();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getBorrowed(){
    this.LoanService.getBorrowed().subscribe((res) => {
      this.dataSource.data = res;
      this.txtStatus="Devoluciones";
    })
  }

  getReturned(){
    this.LoanService.getReturned().subscribe((res) => {
      this.dataSource.data = res;
      this.txtStatus="Prestamos";
    })
  }

  returned(id: number, content: IUser){
    Swal.fire({
      title: 'Quieres eliminar este registro?',
      text: 'Se eliminará el usuario '+content.lastName+', '+content.names,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.LoanService.returned(id).subscribe(() => {
          this.toastr.success('El usuario se desactivo correctamente!', 'Usuario eliminado');
          this.getBorrowed();
        });
      }
    });
  }

  borrowed(id: number, content: IUser){
    Swal.fire({
      title: 'Quieres restaurar este registro?',
      text: 'Se restaurará el usuario '+content.lastName+', '+content.names,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, restauralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.LoanService.borrowed(id).subscribe(() => {
          this.toastr.success('El usuario se restauro correctamente!','Usuario activo');
          this.getReturned();
        })
      }
    });
  }

  deleteLoan(id: number, content: IUser){
    Swal.fire({
      title: 'Quieres eliminar este registro?',
      text: 'Se eliminará el usuario '+content.lastName+', '+content.names,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.LoanService.delete(id).subscribe(() => {
          this.toastr.success('El usuario se elimino correctamente!','Usuario eliminado');
          this.getReturned();
        })
      }
    });
  }

  openSaveModal(loan?: ILoan) {
    const initialState: ModalOptions = {
      initialState: {loan}
    };
    this.bsModalRef = this.modalService.show(LoanSaveComponent, initialState);
    this.bsModalRef.onHidden?.subscribe(() => this.getBorrowed());
  }

}
