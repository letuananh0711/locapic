export default listPOI = (listPOI=[], action) => {
    switch (action.type) {
        case 'addPOI':
            return [...listPOI, action.poi];
        case 'deletePOI':
            return listPOI.filter(poi => poi !== action.poi);
        default:
            return listPOI;
    }
}