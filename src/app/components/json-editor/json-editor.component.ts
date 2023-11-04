import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateComponent } from "../../shared/translate/translate.component";
import { editor } from "monaco-editor";
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

import * as settingSchema from '../../../assets/monaco-editor/settings-type.json';
import { ChangeDetection } from "@angular/cli/lib/config/workspace-schema";

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
  warning = false;

  editorOptions: IStandaloneEditorConstructionOptions = {
    theme: 'functionTheme',
    fontFamily: '"JetBrains Mono", monaco, courier, monospace',
    language: 'json',
    minimap: {enabled: true},
    scrollbar: {alwaysConsumeMouseWheel: false},
    fixedOverflowWidgets: true,
    automaticLayout: true,
  };

  @ViewChild('editorContainer') editorContainer;
  editor: any;

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

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

  async editorInit(editor: IStandaloneCodeEditor) {
    this.editor = editor;
    this.editor.onDidContentSizeChange(() => {
    })

    window.onresize = function (){
      editor.layout({} as any);
    };

    editor.onDidChangeModelDecorations(() => {
      const model = this.editor.getModel();
      if (model === null ) {
        return;
      }
      const owner = model.getLanguageId();
      // @ts-ignore
      const markers = monaco.editor.getModelMarkers({owner});

      setTimeout(() => {
        this.warning = markers.length > 0;
        this.cd.detectChanges()
      }, 100)

    });


    // @ts-ignore
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: "http://localhost/applicationSetting.json",
          fileMatch: ['*'],
          schema: settingSchema
        }
      ]
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
