export const getProducts = async (taxes = []) => {
  const getAllProducts = async (page = 1, array = []) => {
    const query = {
      select_query: `select ${GET_PRODUCTS_FIELDS.join(
        ', ',
      )} from ${PRODUCTS_MODULE} where (Product_Active = 'true') order by Product_Name`,
    };
    const response = await ZOHO.CRM.API.coql(query)
    array.push(...response.data)
    if (response.info.more_records) {
      return getAllProducts(page + 1, array)
    }
    return array
  }

  // const query = {"select_query":"select id, Product_Name, Product_Code, Qty_Ordered, Qty_in_Stock, Unit_Price, Product_Category from Products where ((Product_Active = 'true' and a3d__Producto_Regalo = 'false') and a3d__Tipo = 'Producto') order by Product_Name"} //TODO: CHECK
  const allProducts = await getAllProducts();
  const productsMapped = allProducts.map((el) => mapProductCrmToAppModel(el, taxes));
  return productsMapped;
};
