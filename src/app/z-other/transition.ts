import { transition, style, animate, trigger, state, animateChild, group, query } from "@angular/animations"

const bounceTransition = "500ms cubic-bezier(.47,1.64,.41,.8)"
const bounceTransitionDelay = "300ms 300ms cubic-bezier(.47,1.64,.41,.8)"

// --------------------------------------------------------------------------------------------------------

const fadeInT = transition(':enter', [style({opacity: 0,}),animate('3000s ease-in', style({ opacity: 1}))])
const fadeOutT = transition(':leave', [style({opacity: 1}),animate('3000s ease-in', style({ opacity: 0}))])
const translateInT = transition(':enter', [style({opacity: 0, transform: 'translateX(50%)'}),animate(bounceTransitionDelay, style({opacity: 1, transform: 'translateX(0%)'})),])
const translateOutT = transition(':leave', [style({opacity: 1,transform: 'translateX(0%)'}),animate('500ms ease', style({opacity: 0, transform: 'translateX(50%)'})),])
const heightInT = transition(':enter', [style({opacity: 0,maxHeight: '0px'}),animate('300ms ease-in', style({opacity: 1, maxHeight: '200px'}))])
const heightOutT = transition(':leave', [style({maxHeight: '200px', opacity: 1}),animate('300ms ease-in', style({ maxHeight: '0px', opacity: 0}))])
// --------------------------------------------------------------------------------------------------------

export const fadeIn = trigger('fadeIn', [fadeInT])
export const taskInT = trigger('taskInT', [translateInT])
export const taskOutT = trigger('taskOutT', [translateOutT])
export const creationIn = trigger('creationIn', [heightInT])
export const creationOut = trigger('creationOut', [heightOutT])
export const translateRight =  trigger('translateRight', [
  state('open', style({
    transform: 'translateX(100%)'
  })),
  state('closed', style({
    transform: 'translateX(0%)'
  })),
  transition('open => closed', [
    animate('0.2s ease')
  ]),
  transition('closed => open', [
    animate('0.4s ease')
  ]),
])
export const slideInAnimation =
  trigger('routeAnimations', [
    transition('home <=> setting', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true }),
      ]),
    ]),
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ left: '-100%' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ left: '100%', opacity: 0 }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true }),
        query('@*', animateChild(), { optional: true })
      ]),
    ])
  ]);