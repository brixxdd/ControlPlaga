import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="absolute right-4 top-4">
                    <ThemeToggle />
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Link href="/">
                        <ApplicationLogo className="h-10 w-auto fill-current text-gray-500 dark:text-gray-400" />
                    </Link>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 dark:bg-gray-800">
                        <div className="text-gray-900 dark:text-gray-100">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
