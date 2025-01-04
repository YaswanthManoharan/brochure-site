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
        <div className="bg-yellow-50 shadow-md rounded-lg overflow-hidden transition hover:shadow-xl hover:scale-105 transform duration-300">
            <Image
                src={product.image}
                alt={product.name}
                className="object-cover"
                width={400}
                height={192}
                layout="responsive"
            />
            <div className="p-4">
                <h3 className="text-lg font-bold text-yellow-800">{product.name}</h3>
                <p className="text-yellow-700 font-semibold">₹{product.price}</p>
            </div>
        </div>
    );
}