import { Component, EventEmitter, Output, Input } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Pagination } from '../../../interfaces/paginator.interface';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() first: number = 0;
  @Input() rows: number = 6;
  @Input() totalRecords: number = 0;
  @Input() showPageLinks: boolean = true;
  @Input() currentPageReportTemplate: string =
    'Mostrando {first} de {last} de {totalRecords}';

  @Output() pageChange: EventEmitter<Pagination> =
    new EventEmitter<Pagination>();

  public onPageChange(event: PaginatorState) {
    const paginationEvent: Pagination = {
      first: event.first ?? 0,
      rows: event.rows ?? 0,
      totalRecords: this.totalRecords,
      page: event.page ?? 0, // se concatena totalRecords a PaginatorState ya que no se puede modificar esta interfaz y es necesaria
    };
    this.pageChange.emit(paginationEvent);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
