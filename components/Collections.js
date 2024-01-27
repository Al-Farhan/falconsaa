import Link from "next/link"

const products = [
    {
      id: 1,
      name: 'Medical',
      href: '/medical',
      price: '$48',
      imageSrc: '/medicalCategory.png',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Dental',
      href: '/dental',
      price: '$35',
      imageSrc: '/dentalCategory.png',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Pharmacy',
      href: '/pharmacy',
      price: '$89',
      imageSrc: '/pharmacyCategory.png',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'Nursing',
      href: '/nursing',
      price: '$35',
      imageSrc: '/nursingCategory.png',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    // More products...
  ]
  
  export default function Collections() {
    return (
      <div className="bg-white">
        <h1 className="text-4xl text-center mt-6 font-bold">Collections</h1>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
  
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <Link key={product.id} href={product.href} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h1 className="mt-4 text-xl text-gray-700">{product.name}</h1>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }
  