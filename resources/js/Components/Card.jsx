import Text from '@/Components/Text';

export default function Card({ title, children, className = '' }) {
    return (
        <div className={`
            rounded-lg 
            bg-primary-bg-light dark:bg-primary-bg-dark 
            shadow-sm 
            ${className}
        `}>
            {title && (
                <Text as="h3" className="mb-4 text-lg font-medium">
                    {title}
                </Text>
            )}
            <div className="text-gray-900 dark:text-gray-100">
                {children}
            </div>
        </div>
    );
} 