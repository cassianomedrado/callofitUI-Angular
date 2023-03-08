import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent {
  @Input() title: string = '';
  @Output() dismiss: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  onDismiss() {
    this.dismiss.emit();
  }

  onClose() {
    this.close.emit();
  }
}