export default async c => {
    var p = new Promise((resolve, reject) => {

        setTimeout(() => {
            c.isLoaded = true;
            resolve();
        }, 1);
    });
    return p;
};
