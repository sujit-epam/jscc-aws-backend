import { put, query, scan } from "./db-service"

export const getProductWithCount = async (productId) => {
    const products = await query(process.env.PRODUCTS_TABLE_NAME, productId);
    const productStocks = await query(process.env.STOCKS_TABLE_NAME, productId, 'product_id');
    if (products.length) {
        return {
            ...products[0],
            count: productStocks[0].count,
        }
    }
    throw 'Product with this id not found!';
}

export const getAllProductsWithCount = async () => {
    const products = await scan(process.env.PRODUCTS_TABLE_NAME);
    const productStocks = await scan(process.env.STOCKS_TABLE_NAME);
    if (products.length) {
        return products.map((product) => ({
            ...product,
            count: productStocks.find(productStock =>
                productStock.product_id === product.id)?.count ?? 0
        }))
    }
    throw 'No products found!';
}

export const createProduct = async (product) => {
    await put(process.env.PRODUCTS_TABLE_NAME, product);
    await put(process.env.STOCKS_TABLE_NAME, {
        product_id: product.id,
        count: product.count || 0
    });
}