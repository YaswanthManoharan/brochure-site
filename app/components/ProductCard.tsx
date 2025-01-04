import Image from "next/image";

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
            <Image
                src={product.image}
                alt={product.name}
                className="object-cover"
                width={400} // Replace with appropriate width
                height={192} // Replace with appropriate height
                layout="responsive"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">₹{product.price}</p>
            </div>
        </div>
    );
}