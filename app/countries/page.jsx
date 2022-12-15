import ky from 'ky'

const prefixUrl = process.env.STRAPI_BASE_URL || "http://127.0.0.1:1337" 
const apiUrl = prefixUrl + '/api'

async function getProductData() {
  const response = await ky.get('product?populate=*', { prefixUrl: apiUrl});
  return response.json();
}

async function getWebsiteData() {
  const response = await ky.get('website?populate=*', { prefixUrl: apiUrl });
  return response.json();
}

async function getCountriesData() {
  const response = await ky.get('countries?populate=flag&populate=stores.brand.logo', { prefixUrl: apiUrl });
  return response.json();
}

export default async function CountryPage() {

  const productResponse = await getProductData();
  let product 
  if (productResponse?.data?.attributes) {
    product  = productResponse?.data?.attributes
  }
  let imageProduct
  if (product?.image?.data[0]?.attributes) {
    imageProduct = product?.image.data[0].attributes
  }

  const websiteResponse = await getWebsiteData();
  let website 
  if (websiteResponse?.data?.attributes) {
    website  = websiteResponse?.data?.attributes
  }
  let backgroundColor
  if (website?.backgroundColor) {
    backgroundColor = website?.backgroundColor
  }
  let fontColor
  if (website?.backgroundColor) {
    fontColor = website?.fontColor
  }
  
  const countriesResponse = await getCountriesData();
  let countries 
  if (countriesResponse?.data) {
    countries = countriesResponse?.data
  }

  return (
  
    <div
      className="flex flex-1 flex-col p-6 justify-between bg-slate-900 text-white"
      style={{
          backgroundColor: backgroundColor,
          color: fontColor
        }}> 
    <div className="w-full h-full max-w-full lg:max-w-4xl mx-auto">

      {imageProduct ?
        <div className="flex items-center flex-col w-full">
          <img 
            src={`${prefixUrl}${imageProduct.url}`}
              alt={`${product.name}`} 
              className="h-96"
            // width={`${imageProduct.width}`} 
            // height={`${imageProduct.height}`} 
            />
            <div className="pt-10 md:pt-8 lg:pt-6 text-center">
              <h1 className="text-4xl md:text-3xl lg:text-2xl">{product.name}</h1>
              <h4 className="text-3xl md:text-2xl lg:text-xl pt-4 md:pt-3 lg:pt-2">{product.description}</h4>
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
              <div className="p-4" key={country.id}>
              <div className="flex">
                  <img 
                  className="mr-3 md:mr-3 lg:mr-2 w-10 md:w-9 lg:w-8"
                  src={`${prefixUrl}${countryFlag.url}`}
                  alt={`${countryAttribute.name}`} 
                />
                <h2 className="text-3xl md:text-xl lg:text-lg font-bold">
                  {countryAttribute.name}
                </h2>
                </div>
                {countryStores ?
                  <div className="flex flex-wrap items-stretch pt-8 md:pt-6 lg:pt-4">
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
                        <div
                          key={`store${store.id}`}
                          className="
                              w-full lg:w-1/2 
                              pr-0 lg:pr-4 pb-8 lg:pb-4"
                        >
                          <a href={store.attributes.link}>
                          <div className="
                              h-24 lg:h-16 
                              p-5 lg:p-2.5 
                              flex justify-center items-center
                              border-2 rounded-lg
                              bg-slate-800 border-slate-600 hover:border-slate-400
                              hover:scale-105 ease-out duration-75 shadow-md">
                                {brandLogo ? 
                                <img
                                src={`${prefixUrl}${brandLogo.url}`}
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
                          </div>
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