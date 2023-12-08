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
  module_version: string;
}


export type ApplicationSetting = {
  custom_data: {
    path: string;
    languages: {
      "cs": string;
      "en": string;
    }
  }[]
  events_map: {
    [key: string]: {
      "cs": string;
      "en": string;
    }
  },
  module_version_mapping: {
    [module_version: string]: string[]
  }
  records_custom_data: {
    path: string;
    languages: {
      "cs": string;
      "en": string;
    }
    type: "sum" | "avg" | "max" | "min";
  }[]
  graphs: GraphSetting[]
}


