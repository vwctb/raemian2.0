/**
 * Created by taebumchoi on 2017. 6. 17..
 */
import { css, keyframes } from 'styled-components';
export const media = ({
    desktop: (...args) => css`
        @media (max-width: 1200px) {
            ${ css(...args) }
        }
    `,

    tablet: (...args) => css`
        @media (max-width: 992px) {
            ${ css(...args) }
        }
    `,

    bigphone: (...args) => css`
        @media (max-width: 600px) {
            ${ css(...args) }
        }
    `,

    plusphone: (...args) => css`
        @media (max-width: 460px) {
            ${ css(...args) }
        }
    `,

    mobile: (...args) => css`
        @media (max-width: 375px) {
            ${ css(...args) }
        }
    `,

    small_mobile: (...args) => css`
    @media (max-width: 320px) {
        ${ css(...args) }
    }
`
    
});

// 그림자 효과: https://codepen.io/sdthornton/pen/wBZdXq 기반
export const shadow = (weight) => {
    const shadows = [
        css`box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);`,
        css`box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);`,
        css`box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);`,
        css`box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);`,
        css`box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);`
    ];

    return shadows[weight];
};


export const transitions = {
    slideDown: keyframes`
        0% {
            opacity: 0;
            transform: translateY(-100vh);
        }
        75% {
            opacity: 1;
            transform: translateY(50px);
        }
        100% {
            transform: translateY(0px);
        }
    `,
    slideUp: keyframes`
        0% {
            transform: translateY(0px);
            opacity: 1;
        }
        25% {
            opacity: 1;
            transform: translateY(50px);
        }
        100% {
            opacity: 0;
            transform: translateY(-100vh);
        }
    `,
    stretchOut: keyframes`
        0% {
            transform: scale(0,0);
        }
        100% {
            transform: scale(1,1);
        }
    `,
    shrinkIn: keyframes`
        0% {
            transform: scale(1, 1);
        }
        100% {
            transform: scale(0,0);
        }
    `
}