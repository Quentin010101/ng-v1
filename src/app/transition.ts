import { transition, style, animate, trigger } from "@angular/animations"

const enterTransition = transition(':enter', [
    style({
      opacity: 0,
    }),
    animate('1s ease-in', style({ opacity: 1})),
  ])
  const exitTransition = transition(':leave', [
    style({
      opacity: 1
    }),
    animate('1s ease-in', style({ opacity: 0}))
  ])
  const translateEnter = transition(':enter', [
    style({
      transform: 'translateX(100%)'
    }),
    animate('500ms ease-in', style({ transform: 'translateX(-10%)'})),
    animate('100ms ease-in', style({ transform: 'translateX( 0%)'})),
  ])
  const translateLeave = transition(':leave', [
    style({
      transform: 'translateX(0%)'
    }),
    animate('100ms 400ms ease-in', style({ transform: 'translateX(-10%)'})),
    animate('500ms ease-in', style({ transform: 'translateX( 100%)'})),
  ])
  const scaleEnter = transition('void => true', [
    style({
      transform: 'translateX(-100%)'
    }),
    animate('500ms ease-in', style({ transform: 'translateX(-10%)'})),
    animate('100ms ease-in', style({ transform: 'translateX( 0%)'})),
  ])

  export const tEnter = trigger('tEnter', [translateEnter])
  export const tLeave = trigger('tLeave', [translateLeave])
  export const fadeIn = trigger('fadeIn', [enterTransition])
  export const fadeOut = trigger('fadeOut', [exitTransition])
  export const scaleE = trigger('scaleE', [scaleEnter])