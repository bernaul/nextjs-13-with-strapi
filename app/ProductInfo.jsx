import React from 'react'

const apiUrl = process.env.STRAPI_BASE_URL || "http://127.0.0.1:1337"

const getProductData = async () => {
  const url = `${apiUrl}/api/product?populate=*`
  const res = await fetch(url);
  return res.json();
}

export default async function ProductInfo() {

  const productResponse = await getProductData();
  const product = productResponse?.data?.attributes
  const imageProduct = productResponse?.data?.attributes.image.data[0].attributes
  
  return (
    <div>
      {imageProduct ?
        <div className="flex items-center justify-center">
          <img 
            src={`${apiUrl}${imageProduct.url}`}
            alt={`${product.name}`} 
            width={`${imageProduct.width}`} 
            height={`${imageProduct.height}`} 
          />
        </div>
        : null
      }
    </div>
  )
}
