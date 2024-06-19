import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ILoan } from './model/loan.model';
import { LoanService } from './service/loan.service';
import { LoanSaveComponent } from './components/loan-save.component';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styles: [
  ]
})
export class LoanComponent implements AfterViewInit, OnInit {

  private bsModalRef?: BsModalRef;
  displayedColumns: string[] = ['user', 'book', 'amount', 'loanDate', 'returnDate', 'accion'];
  dataSource = new MatTableDataSource<ILoan>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  txtStatus: string = "Realizados";

  constructor(private loanService: LoanService, private _liveAnnouncer: LiveAnnouncer, private modalService: BsModalService, private toastr: ToastrService) {}
  
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
    if (this.txtStatus=="Realizados") {
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
    this.loanService.getActive().subscribe((res) => {
      this.dataSource.data = res;
      this.txtStatus="Realizados";
    })
  }

  getInactive(){
    this.loanService.getInactive().subscribe((res) => {
      this.dataSource.data = res;
      this.txtStatus="Pendientes";
    })
  }

  removed(content: ILoan){
    Swal.fire({
      title: 'Quieres marcar como realizado este registro?',
      text: 'Se marcará como realizado el préstamo del usuario!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, realizado!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loanService.removed(content.id).subscribe(() => {
          this.toastr.success('El préstamo se colocó como hecho correctamente!', 'Préstamo realizado');
          this.getActive();
        });
      }
    });
  }

  restore(content: ILoan){
    Swal.fire({
      title: 'Quieres restaurar como pendiente este préstamo?',
      text: 'Se restaurará el préstamo del usuario!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, restauralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loanService.restore(content.id).subscribe(() => {
          this.toastr.success('El préstamo se restauró como pendiente correctamente!','Préstamo restaurado como pendiente');
          this.getInactive();
        })
      }
    });
  }

  deleteLoan(content: ILoan){
    Swal.fire({
      title: 'Quieres eliminar este préstamo?',
      text: 'Se eliminará el préstamo del usuario '+content.user,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loanService.delete(content.id).subscribe(() => {
          this.toastr.success('El préstamo se elimino correctamente!','Préstamo eliminado');
          this.getInactive();
        })
      }
    });
  }

  openSaveModal(loan?: ILoan) {
    const initialState: ModalOptions = {
      initialState: {loan}
    };
    this.bsModalRef = this.modalService.show(LoanSaveComponent, initialState);
    this.bsModalRef.onHidden?.subscribe(() => this.getActive());
  }

}
