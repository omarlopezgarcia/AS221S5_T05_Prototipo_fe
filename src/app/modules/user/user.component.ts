import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { IUbigeo } from '../ubigeo/model/ubigeo.model';
import { IUser } from './model/user.model';
import { UserService } from './service/user.service';
import { UserSaveComponent } from './components/user-save/user-save.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements AfterViewInit, OnInit {

  private bsModalRef?: BsModalRef;
  displayedColumns: string[] = ['lastName', 'names', 'documentType', 'documentNumber', 'ubigeo', 'email', 'cellPhone', 'birthDate', 'accion'];
  dataSource = new MatTableDataSource<IUser>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  txtStatus: string = "Inactivos";

  constructor(private userService: UserService, private _liveAnnouncer: LiveAnnouncer, private modalService: BsModalService, private toastr: ToastrService) {}
  
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
    this.userService.getActive().subscribe((res) => {
      this.dataSource.data = res;
      this.txtStatus="Inactivos";
    })
  }

  getInactive(){
    this.userService.getInactive().subscribe((res) => {
      this.dataSource.data = res;
      this.txtStatus="Activos";
    })
  }

  removed(content: IUser){
    Swal.fire({
      title: 'Quieres eliminar este registro?',
      text: 'Se eliminará el usuario '+content.lastName+', '+content.names,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.removed(content.id).subscribe(() => {
          this.toastr.success('El usuario se desactivo correctamente!', 'Usuario eliminado');
          this.getActive();
        });
      }
    });
  }

  restore(content: IUser){
    Swal.fire({
      title: 'Quieres restaurar este registro?',
      text: 'Se restaurará el usuario '+content.lastName+', '+content.names,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, restauralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.restore(content.id).subscribe(() => {
          this.toastr.success('El usuario se restauro correctamente!','Usuario activo');
          this.getInactive();
        })
      }
    });
  }

  deleteUser(content: IUser){
    Swal.fire({
      title: 'Quieres eliminar este registro?',
      text: 'Se eliminará el usuario '+content.lastName+', '+content.names,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(content.id).subscribe(() => {
          this.toastr.success('El usuario se elimino correctamente!','Usuario eliminado');
          this.getInactive();
        })
      }
    });
  }

  openSaveModal(user?: IUser) {
    const initialState: ModalOptions = {
      initialState: {user}
    };
    this.bsModalRef = this.modalService.show(UserSaveComponent, initialState);
    this.bsModalRef.onHidden?.subscribe(() => this.getActive());
  }

}
