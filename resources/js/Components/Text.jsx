export default function Text({ children, className = '', as = 'p' }) {
    const Component = as;
    
    return (
        <Component 
            className={`text-gray-900 dark:text-gray-100 ${className}`}
        >
            {children}
        </Component>
    );
} 