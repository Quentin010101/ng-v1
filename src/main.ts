import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environnement } from './environnement';



export function initializeUserData() {
      return () : Promise<any> => {
        return waiting()
      }

}

function waiting(){
  return new Promise<void>((resolve,reject)=>{
    setTimeout(()=>{
      resolve()
    },environnement.startAnimation.time) 
  })
}
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
