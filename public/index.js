const clicktest = function() {
    const testGetData = fetch('/notes');
    testGetData.then((data) => {
        console.log('it works');
        console.log('data');
    })    
};
