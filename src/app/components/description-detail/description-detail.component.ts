import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslateComponent } from "../../shared/translate/translate.component";

@Component({
  selector: 'app-description-detail',
  templateUrl: './description-detail.component.html',
  styleUrls: ['./description-detail.component.scss']
})
export class DescriptionDetailComponent extends TranslateComponent{

  @Input({required: true}) title: string;
  @Input({required: true}) value: string;

  @Output() changeValue: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild("textAreaElement") set textArea(ref: ElementRef<HTMLTextAreaElement>) {
    if (!!ref){
      ref.nativeElement.focus();
    }
  };

  edit = false;
  prevValue = "";


  editDescription() {
    this.edit = true;
    this.prevValue = this.value;
  }


  confirmEdit() {
    this.changeValue.emit(this.value);
    this.edit = false;
  }

  cancelEdit() {
    this.value = this.prevValue;
    this.edit = false;
  }
}
