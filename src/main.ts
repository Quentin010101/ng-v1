import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';



export function initializeUserData() {
      return () : Promise<any> => {
        return waiting()
      }

}

function waiting(){
  return new Promise<void>((resolve,reject)=>{
    setTimeout(()=>{
      resolve()
    },6000) //6000
  })
}
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
