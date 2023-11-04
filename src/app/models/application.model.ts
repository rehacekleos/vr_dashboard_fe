import { GraphSetting } from "./graph.model";

export class Application {
  id: string;
  identifier: string;
  name: string;
  setting: ApplicationSetting;
  modules: string[];
}

export class NewApplication {
  name: string;
  identifier: string;
  setting: any;
}

export class AddModule {
  module: string;
  log_version: string;
}


export type ApplicationSetting = {
  custom_data: {
    path: string;
    languages: {
      "cs": string;
      "en": string;
    }
  }[]
  records_custom_data: any
  graphs: GraphSetting[]
}


