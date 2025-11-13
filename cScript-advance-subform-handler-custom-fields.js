const typeOfQuoteValue = value;

// Subform Fields
const quoteSubform = ZDK.Page.getSubform("Quoted_Items");
const quoteSubFormValues = quoteSubform.getValues();

const newSubFormValues = quoteSubFormValues.map((row) => {
    if (typeOfQuoteValue === "Por persona") {
        return {
            ...row,
            Quantity: 1,
            N_mero_Adultos: row.N_mero_Adultos || 0,
            N_mero_Ni_os: row.N_mero_Ni_os || 0
        };
    } else {
        return {
            ...row,
            Quantity: row.Quantity || 1,
            N_mero_Adultos: 0,
            N_mero_Ni_os: 0
        };
    }
});
console.log("Seteando nuevos valores...", newSubFormValues);
quoteSubform.setValues(newSubFormValues);

console.log("Aplicando setReadOnly...");
quoteSubFormValues.forEach((el, index) => {
    const numAdultosField = quoteSubform.getField('N_mero_Adultos', index);
    const numNinosField = quoteSubform.getField('N_mero_Ni_os', index);
    const quantityField = quoteSubform.getField('Quantity', index);
    const listPriceField = quoteSubform.getField('List_Price', index);

    if (typeOfQuoteValue === "Por persona") {
        console.log("Modo 'Por persona': Habilitando campos.");
        numAdultosField.setReadOnly(false);
        numNinosField.setReadOnly(false);
        quantityField.setReadOnly(true);
        listPriceField.setReadOnly(true);
    } else {
        console.log("Modo 'Por habitación': Deshabilitando campos.");
        numAdultosField.setReadOnly(true);
        numNinosField.setReadOnly(true);
        quantityField.setReadOnly(false);
        listPriceField.setReadOnly(false);
    }
});
