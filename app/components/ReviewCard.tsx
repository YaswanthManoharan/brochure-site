'use client';

type ReviewCardProps = {
    name: string;
    product: string;
    feedback: string;
};

export default function ReviewCard({ name, product, feedback }: ReviewCardProps) {
    return (
        <div className="bg-yellow-50 shadow-lg rounded-lg p-5 flex flex-col relative border border-gray-300 hover:border-yellow-400 hover:scale-105 transform transition-all duration-300 ease-in-out">
            {/* Subtle revolving border animation */}
            <div className="absolute inset-0 border-2 rounded-lg border-transparent animate-borderGlow"></div>

            <div className="relative z-10">
                <h4 className="text-xl font-bold text-gray-800 mb-2">{name}</h4>
                <p className="text-sm text-gray-600">
                    <strong>Product:</strong> {product}
                </p>
                <p className="text-gray-700 mt-3 italic">&quot;{feedback}&quot;</p> {/* Escaped quotes */}
            </div>
        </div>
    );
}
