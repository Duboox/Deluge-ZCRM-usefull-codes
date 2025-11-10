
/** 
 * log("sample logging statement") --> can be used to print any data in the browser console.
 * ZDK module can be used for customising the UI and other functionalities.
 * return false to prevent <SAVE> action
**/

const selectedHotel = value;
const subform = ZDK.Page.getSubform("Quoted_Items");

if (selectedHotel) {
    const criteria = "(Hotel:equals:" + selectedHotel.id + ")";
    subform.getField('Product_Name').setCriteria(criteria, { filterOnSearch: true });
} else {
    subform.getField('Product_Name').setCriteria(null);
}
