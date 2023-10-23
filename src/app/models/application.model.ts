export class Application {
  id: string;
  identifier: string;
  name: string;
  setting: any;
  hasModule: boolean;
}

export class NewApplication {
  name: string;
  identifier: string;
  setting: any;
}

export class AddModule{
  module: string;
}
