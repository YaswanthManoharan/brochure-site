interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
  }
  
  interface ProductCardProps {
    product: Product;
  }
  
  export default function ProductCard({ product }: ProductCardProps) {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-500">₹{product.price}</p>
        </div>
      </div>
    );
  }
  