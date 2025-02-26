export default function Button({ children, className = '', ...props }) {
    return (
        <button
            className={`rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold 
                text-white shadow-sm hover:bg-indigo-500 
                dark:bg-indigo-500 dark:hover:bg-indigo-400 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
} 