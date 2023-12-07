import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TranslateComponent } from "../../../../shared/translate/translate.component";
import { Participant } from "../../../../models/participant.model";
import { Employee } from "../../../../models/employee.model";

@Component({
  selector: 'app-edit-employee-participants-modal',
  templateUrl: './edit-employee-participants-modal.component.html',
  styleUrls: ['./edit-employee-participants-modal.component.scss']
})
export class EditEmployeeParticipantsModalComponent extends TranslateComponent implements OnChanges{

  @Input() open: boolean;
  @Input() allParticipants: Participant[];
  @Input() employee: Employee;
  @Output() visibleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() newAssignedParticipants: EventEmitter<string[]> = new EventEmitter<string[]>();

  assignedMap: Map<string, boolean> = new Map();

  constructor() {
    super();
  }

  ngOnChanges(changes:SimpleChanges): void {
    if (changes.open?.currentValue === true){
      for (const par of this.allParticipants){
        if (this.employee.participantIds.find(p => p == par.id)){
          this.assignedMap.set(par.id, true);
        } else {
          this.assignedMap.set(par.id, false);
        }
      }
    }
  }

  isAssigned(id: string){
    return this.assignedMap.get(id);
  }

  changeAssignment(id: string){
    const actualState = this.assignedMap.get(id);
    this.assignedMap.set(id, !actualState);
  }

  visibleChange($event: boolean) {
    this.visibleChanged.emit($event);
  }

  onSubmit() {
    const newIds = [];
    for (let [key, assign] of this.assignedMap){
      if (assign){
        newIds.push(key);
      }
    }

    this.newAssignedParticipants.emit(newIds);
  }

}
