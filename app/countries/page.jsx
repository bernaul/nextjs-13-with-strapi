
const apiUrl = process.env.STRAPI_BASE_URL || "http://127.0.0.1:1337"

async function getProductData() {
  const url = `${apiUrl}/api/product?populate=*`
  const res = await fetch(url);
  return res.json();
}

async function getCountriesData() {
  const url = `${apiUrl}/api/countries?populate=flag&populate=stores.brand.logo`
  const res = await fetch(url);
  return res.json();
}

export default async function CountryPage() {

  const productResponse = await getProductData();
  const product = productResponse?.data?.attributes
  const imageProduct = productResponse?.data?.attributes.image.data[0].attributes
  
  const countriesResponse = await getCountriesData();
  const countries = countriesResponse?.data

  return (
  
  <div className="flex flex-1 flex-col p-6 justify-between bg-slate-900 text-white"> 
    <div className="w-full h-full max-w-2xl mx-auto">

      {imageProduct ?
        <div className="flex items-center flex-col w-full h-full ">
          <img 
            src={`${apiUrl}${imageProduct.url}`}
            alt={`${product.name}`} 
            width={"250px"}
            // width={`${imageProduct.width}`} 
            // height={`${imageProduct.height}`} 
          />
          <div>{product.name}</div>
        </div>
        : null
      }

      {countries ?
        <div className="mt-8">
          {countries.map(country => {
            return (
              <div className="p-5" key={country.id}>
              <div className="flex">
                  <img 
                  className="mr-2"
                  src={`${apiUrl}${country.attributes.flag.data[0].attributes.url}`}
                  alt={`${country.attributes.name}`} 
                  width={'30'} 
                />
                <h2 className="text-lg font-bold">
                  {country.attributes.name}
                </h2>
              </div>
                <div>
                  {country.attributes.stores.data.map(store => {
                    return (
                      <div className="p-2 my-3 border-2 rounded-lg bg-slate-800 border-slate-600 hover:border-slate-400" key={store.id}>
                      <a className="w-full h-full" href={store.attributes.link}>
                      <img 
                src={`${apiUrl}${
                  store.attributes.brand.data.attributes.logo.data.attributes.url}`}
                alt={`${
                  store.attributes.brand.data.attributes.name}`} 
                width={'80'} 
              />
                        </a>
                    </div>
                    )}
                  )}
                </div>
              </div>
           )}
          )}
        </div>
        : null
      }
    </div>
    </div>
  )
}