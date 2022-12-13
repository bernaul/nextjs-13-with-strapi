
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
  
  let product 
  if (productResponse?.data?.attributes) {
    product  = productResponse?.data?.attributes
  }
  
  let imageProduct
  if (productResponse?.data?.attributes?.image?.data[0]?.attributes) {
    imageProduct = productResponse?.data?.attributes.image.data[0].attributes
  }
  
  const countriesResponse = await getCountriesData();
  let countries 
  if (countriesResponse?.data) {
    countries = countriesResponse?.data
  }

  return (
  
  <div className="flex flex-1 flex-col p-6 justify-between bg-slate-900 text-white"> 
    <div className="w-full h-full max-w-full lg:max-w-2xl mx-auto">

      {imageProduct ?
        <div className="flex items-center flex-col w-full">
          <img 
            src={`${apiUrl}${imageProduct.url}`}
              alt={`${product.name}`} 
              className="h-auto lg:h-96"
            // width={`${imageProduct.width}`} 
            // height={`${imageProduct.height}`} 
            />
            <div className="pt-10 lg:pt-6 text-center">
              <h1 className="text-5xl lg:text-2xl">{product.name}</h1>
              <h4 className="text-4xl lg:text-base pt-4 lg:pt-2">{product.description}</h4>
            </div>
        </div>
        : null
      }

      {countries ?
        <div className="mt-8">
          {countries.map(country => {
            const countryAttribute = country.attributes
            let  countryFlag 
            let countryStores 
            
            if (countryAttribute)
            {
              countryStores = countryAttribute.stores.data
              countryFlag = countryAttribute.flag.data[0].attributes
            }
            
            return (
              <div className="p-5" key={country.id}>
              <div className="flex">
                  <img 
                  className="mr-2"
                  src={`${apiUrl}${countryFlag.url}`}
                  alt={`${countryAttribute.name}`} 
                  width={'30'} 
                />
                <h2 className="text-4xl lg:text-lg font-bold">
                  {countryAttribute.name}
                </h2>
                </div>
                {countryStores ?
                  <div className="flex flex-wrap items-stretch pt-8 lg:pt-4">
                    {countryStores.map(store => {

                      let brand
                      let brandLogo
                      if (store.attributes.brand?.data?.attributes) {
                        brand = store.attributes.brand.data.attributes
                      }
                      if (brand.logo?.data?.attributes) {
                        brandLogo = brand.logo.data.attributes
                      }

                      return (
                          <a
                            key={`store${store.id}`}
                              className="w-full lg:w-1/2 pr-4 lg:pr-2 pb-4 lg:pb-2"
                             href={store.attributes.link}
                           >
                              <div className="h-32 lg:h-16 p-5 lg:p-2.5 border-2 flex justify-center items-center rounded-lg bg-slate-800 border-slate-600 hover:border-slate-400">
                                {brandLogo ? 
                                <img
                                src={`${apiUrl}${brandLogo.url}`}
                                alt={`${brand.name}`}
                                style={{
                                  maxWidth:"100%",
                                  maxHeight:"100%"
                                }}
                                  />
                              :
                              <h2>
                              {brand.name}</h2>
                              }
                             </div>
                              </a>
                      )
                    }
                    )}
                  </div>
                  : null}
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