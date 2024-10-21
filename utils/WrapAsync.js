module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

// function WrapAsync(fn) {
//     return function(req, res, next) {
//         fn(req, res, next).catch(next);
//     };
// }

// module.exports = WrapAsync;
