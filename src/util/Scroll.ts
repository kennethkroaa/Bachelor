/* Scroll smoothly to a specified ref */
export const scrollToRef = (ref: any) => {
    //Make sure we're client-side and not server-side, window has to exist
    if(typeof(window) !== "undefined" && typeof(ref) !== "undefined"){
        window.scrollTo({
            top: ref.offsetTop - 96, 
            left: 0, 
            behavior: 'smooth'
        });
    }
}

export const scrollToTop = () => {
    //Make sure we're client-side and not server-side, window has to exist
    if(typeof(window) !== "undefined"){
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }
}