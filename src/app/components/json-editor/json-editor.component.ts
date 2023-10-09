import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateComponent } from "../../shared/translate/translate.component";

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss']
})
export class JsonEditorComponent extends TranslateComponent implements OnInit {

  @Input({required: true}) title: string;
  @Input({required: true}) json: any;

  value = "";

  @Output() onJsonChanged: EventEmitter<any> = new EventEmitter<any>();

  edit = false;
  notValidJson = false;

  editorOptions = {
    theme: 'functionTheme',
    fontFamily: '"JetBrains Mono", monaco, courier, monospace',
    language: 'json',
    minimap: {enabled: false},
    scrollbar: {alwaysConsumeMouseWheel: false},
    fixedOverflowWidgets: true,
  };

  @ViewChild('editorContainer') editorContainer;
  editor: any;

  ngOnInit(): void {
    if (this.json == null || this.json == "") {
      this.value = "";
    } else {
      this.value = JSON.stringify(this.json, null, 2);
    }
  }

  textChanged($event: any) {
    if (this.edit === false) {
      this.edit = true;
    }
    this.notValidJson = !this.isValidJson($event) && $event !== "";
  }

  updateHeight() {
    const contentHeight = 200;
    this.editorContainer.nativeElement.style.height = contentHeight + 'px';
  }


  async editorInit(editor: any) {
    this.editor = editor;
    this.editor.onDidContentSizeChange(() => {
      this.updateHeight();
    })
  }


  cancelEdit() {
    this.value = JSON.stringify(this.json, null, 2);
    this.edit = false;
  }

  confirmEdit() {
    if (this.value === ""){
      this.onJsonChanged.emit("");
    } else {
      const val = JSON.parse(this.value);
      this.onJsonChanged.emit(val);
    }
    this.edit = false;
  }

  private isValidJson(json: string): boolean {
    try {
      JSON.parse(json);
      return true;
    } catch (e) {
      return false;
    }
  }
}
