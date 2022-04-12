import { AnimationVariables, IRawStyle, keyframes } from "office-ui-fabric-react";

export const FADE_IN: string = keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 }
});

export const FADE_OUY: string = keyframes({
    from: { opacity: 1 },
    to: { opacity: 0, visibility: 'hidden' }
});

export const createSlideInY = (fromY: number): string => {
    return keyframes({
        from: { transform: `translate3d(0,${fromY}px,0)` },
        to: { transform: `translate3d(0,0,0)` }
    });
}

export const createAnimation = (
    animationName: string, 
    animationDuration: string,
    animationTimingFunction: string
): IRawStyle => {
    return {
        animationName,
        animationDuration,
        animationTimingFunction,
        animationFillMode: 'both'
    }
};

const SLIDE_UP_IN100: string = createSlideInY(100);

export const KiskbaAnimationStyles = {
    slideUpIn100: createAnimation(
        `${FADE_IN}, ${SLIDE_UP_IN100}`,
        AnimationVariables.durationValue3,
        AnimationVariables.easeFunction1
    ),
}