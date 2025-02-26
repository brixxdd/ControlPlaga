export default function Input({ className = '', ...props }) {
    return (
        <input
            className={`
                rounded-md 
                border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                focus:border-indigo-500 dark:focus:border-indigo-600
                focus:ring-indigo-500 dark:focus:ring-indigo-600
                ${className}
            `}
            {...props}
        />
    );
} 