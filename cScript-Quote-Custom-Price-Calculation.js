const typeOfQuoteField = ZDK.Page.getField('Tipo_de_tarifa');
if (typeOfQuoteField.getValue() !== "Por persona") {
    return; 
}

// 2. Obtenemos la fila que cambió
const quoteSubform = ZDK.Page.getSubform("Quoted_Items");
const quoteSubformValues = quoteSubform.getValues();
console.log('quoteSubformValues', quoteSubformValues);

// 3. Obtenemos el producto seleccionado
const productValue = quoteSubformValues[index].Product_Name

// Si no han elegido producto, no calculamos nada
if (!productValue) return;

// 4. Obtenemos cuántos adultos y niños puso el usuario
const numAdultosField = quoteSubformValues[index].N_mero_Adultos;
const numNinosField = quoteSubformValues[index].N_mero_Ni_os;

let cantAdultos = numAdultosField
let cantNinos = numNinosField

// Pequeña validación: si están vacíos, contamos como 0
if (cantAdultos == null) cantAdultos = 0;
if (cantNinos == null) cantNinos = 0;

// 5. BUSCAMOS LOS PRECIOS DEL PRODUCTO
let productDetails = ZDK.Apps.CRM.Products.fetchById(productValue.id);

if (productDetails) {
    let precioBaseAdulto = productDetails.Precio_Adulto || 0; 
    let precioBaseNino = productDetails.Precio_Ni_o || 0; // Ojo si tu campo se llama Precio_Ni_o

    console.log("Precios Base -> Adulto: " + precioBaseAdulto + ", Niño: " + precioBaseNino);

    // 6. CALCULAMOS EL TOTAL
    let nuevoPrecioTotal = (cantAdultos * precioBaseAdulto) + (cantNinos * precioBaseNino);

    // 7. ACTUALIZAMOS EL PRECIO DE LISTA
    quoteSubformValues[index].List_Price = nuevoPrecioTotal;
    quoteSubform.setValues(quoteSubformValues);
}
