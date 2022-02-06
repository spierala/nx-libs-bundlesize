

# Nx libs bundlesize

The workspace contains two libs and one Angular app:

- my-lib-js (created with `nx generate @nrwl/js:library my-lib-js --publishable`)
- my-lib-angular (created with `nx generate @nrwl/angular:library my-lib-angular --publishable --importPath my-lib-angular`)

Both libs contain the same source code, the only difference is: one lib is a TypeScript (@nrwl/js) lib, the other one is an Angular (@nrwl/angular) lib. 

The app imports the compiled js from the compiled libs (from the dist folders) by settings the paths in tsconfig.base.json:
```
"paths": {
      "my-lib-angular": ["dist/libs/my-lib-angular"],
      "my-lib-js": ["dist/libs/my-lib-js"]
    }
```

The app contains a file app-state.service.ts where the import from the lib can be toggled.

```ts
import { Injectable } from '@angular/core';
// TOGGLE THE IMPORT BELOW
// import { StateService } from 'my-lib-js'; // Large bundle size
import { StateService } from 'my-lib-angular'; // Normal bundle size

@Injectable({
  providedIn: 'root'
})
export class AppStateService extends StateService<any>{

  constructor() {
    super({})
  }
}
```
## Check bundle size

The app bundle size can be checked with source-map-explorer running this command:
`npm run build:stats`

The app bundle sizes are quite different for the 2 libraries:

- JS lib (@nrwl/js) `import { StateService } from 'my-lib-js'`: **[combined] (215.29 KB)**
- Angular lib (@nrwl/angular) `import { StateService } from 'my-lib-angular';`: **[combined] (160.46 KB)**

Both libs use RxJS and the JS lib causes a full import of RxJS in the app bundle.

Running `ng build my-app` shows also this warning `Warning: nx-test/apps/my-app/src/app/app-state.service.ts depends on 'my-lib-js'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies`

#### Angular lib (@nrwl/angular)
![Screenshot 2022-02-06 at 10 45 15](https://user-images.githubusercontent.com/1272446/152675401-197ade85-a69c-4b39-b0b9-b89c77f03d72.png)

#### JS lib (@nrwl/js)
![Screenshot 2022-02-06 at 10 46 06](https://user-images.githubusercontent.com/1272446/152675421-ccd173b6-630b-4667-be1a-96c747b5b42d.png)
