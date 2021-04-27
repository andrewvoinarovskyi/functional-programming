const figures = [
    { type: 'square', side: 3, color: 'blue' },
    { type: 'square', side: 5, color: 'green' },
    { type: 'circle', radius: 3, color: 'blue' },
    { type: 'circle', radius: 4, color: 'red' },
    { type: 'circle', radius: 5, color: 'red' },
    { type: 'rectangle', firstSide: 3, secondSide: 4, color: 'green' },
    { type: 'rectangle', firstSide: 2, secondSide: 6, color: 'blue' },
    { type: 'rectangle', firstSide: 2, secondSide: 3, color: 'blue' },
];
console.log('figures:', figures);

/****************Предикати*************/
const hasColor = (color) => (el => el.color === color);

const sum = () => ((first, second) => (first + second));

const max = () => ((first, second) => (first > second ? first : second));

function calcPerimeter () {
    return (figure) => (figure.type === 'square') ? (4 * figure.side) :
        (figure.type === 'circle') ? Number((2 * Math.PI.toFixed(2) * figure.radius).toFixed(2)) :
            (figure.type === 'rectangle') ? (2 * (figure.firstSide + figure.secondSide)) : 0;
}

const hasForm = (form) => (el => el.type === form);

/****************Обгортки*************/
const Map = (mapper) => array => array.map(mapper);

const Filter = (callback) => array => array.filter(callback);

const Reduce = (reducer) => array => array.reduce(reducer);

/****************API*********************/
// const blueFigures = Filter(hasColor('blue'))(figures);
// console.log('blueFigures:', blueFigures);
//
// const redFigures = (array => array.filter(el => el.color === 'red'))(figures);
// console.log('redFigures:', redFigures);
//
// const redPerimeters = Map(calcPerimeter())(Filter(hasColor('red'))(figures));
// console.log('perimeters:', redPerimeters);
//
// const maxRedPerimeter = Reduce(max())(redPerimeters);
// console.log(maxRedPerimeter);


/*

reduce(reducer, list, initialValue)

(defn applyRightToLeft [a, f] (f a))
(def flow #(reduce applyRightToLeft))
(def maxBluePerimeter (flow (Reduce max) (Map calcPerimeter)))

*/


const flow = (...functions) => (functions.length > 0 ? (functions[0])(flow(...functions.slice(1))) : (functions[0]));

const combine = (...functions) => (functions.length > 1 ? (functions[functions.length - 1])(combine(...functions.slice(0, -1))) : (functions[0]));

let maxBluePerimeter =
    flow(
        Reduce(max()),
        Map(calcPerimeter()),
        Filter(hasColor('red')),

    )(figures);

let maxGreenPerimeter =
    combine(
        figures,
        Filter(hasColor('green')),
        Map(calcPerimeter()),
        Reduce(max()),
    );

console.log('maxBluePerimeter:', maxBluePerimeter);
console.log('maxGreenPerimeter:', maxGreenPerimeter);