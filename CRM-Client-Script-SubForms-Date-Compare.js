
/** 
 * log("sample logging statement") --> can be used to print any data in the browser console.
 * ZDK module can be used for customising the UI and other functionalities.
 * return false to prevent <SAVE> action
**/

const id = $Page.record_id;
const caseCrm = ZDK.Apps.CRM.Deals.fetchById(id);

// Last Account participants record
//log("Pre_Account_Participants", JSON.stringify(caseCrm.Pre_Account_Participants))

//Actual Account participants records
const preACSubform = ZDK.Page.getForm().getValues().Pre_Account_Participants;
//log("preACSubform", preACSubform)


//Get Update date (now)
const now = new Date()
const options = {
  year: 'numeric', // Use 'numeric' for full year (e.g., 2024)
  month: 'short', // Use 'short' for abbreviated month (e.g., Jun)
  day: 'numeric',  // Use 'numeric' for day of the month (e.g., 12)
};

// Format date and time separately
const formattedDate = now.toLocaleDateString('en-US', options);
const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

// Combine formatted date and time with a space
const formattedUpdateDate = `${formattedDate} ${formattedTime}`;


// Function to compare last and actual subform, and update update time
function compareAndModify(arr1, arr2) {
  return arr2.map(obj2 => {
    // Handle potential undefined obj1 in the first check
    const match = arr1.find(obj1 => obj1?.Contact.id === obj2.Contact.id); // Optional chaining for obj1.id

    if (!match) {
      // No match in arr1, add modifiedTime unconditionally
      return { ...obj2, Modified_Time1: formattedUpdateDate };
    } else if (JSON.stringify(match.Role) !== JSON.stringify(obj2.Role)) {
      // Deep comparison to ensure role arrays are identical
      return { ...obj2, Modified_Time1: formattedUpdateDate };
    }
    return obj2; // No modification needed
  });
}

const result = compareAndModify(caseCrm.Pre_Account_Participants, preACSubform);

//Add result with updated modifed time to subform
const subform_field = ZDK.Page.getField('Pre_Account_Participants');
subform_field.setValue(result);

//Save the record
return true;
