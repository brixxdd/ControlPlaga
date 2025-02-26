import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Text from '@/Components/Text';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar Sesión" />

            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Text as="h2" className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
                        Iniciar Sesión
                    </Text>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {status && (
                        <div className="mb-4 rounded-md bg-green-50 dark:bg-green-900 p-4">
                            <Text className="text-sm font-medium text-green-800 dark:text-green-200">
                                {status}
                            </Text>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={submit}>
                        <div>
                            <InputLabel 
                                htmlFor="email" 
                                value="Email" 
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100" 
                            />
                            <div className="mt-2">
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 
                                        text-gray-900 dark:text-gray-100 
                                        bg-white dark:bg-gray-800
                                        shadow-sm ring-1 ring-inset 
                                        ring-gray-300 dark:ring-gray-700 
                                        placeholder:text-gray-400 dark:placeholder:text-gray-500
                                        focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500"
                                />
                            </div>
                            <InputError message={errors.email} className="mt-2 text-sm text-red-500" />
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <InputLabel 
                                    htmlFor="password" 
                                    value="Contraseña"
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100" 
                                />
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 
                                            dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                )}
                            </div>
                            <div className="mt-2">
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 
                                        text-gray-900 dark:text-gray-100 
                                        bg-white dark:bg-gray-800
                                        shadow-sm ring-1 ring-inset 
                                        ring-gray-300 dark:ring-gray-700 
                                        placeholder:text-gray-400 dark:placeholder:text-gray-500
                                        focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500"
                                />
                            </div>
                            <InputError message={errors.password} className="mt-2 text-sm text-red-500" />
                        </div>

                        <div className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 
                                    text-indigo-600 dark:text-indigo-500 
                                    focus:ring-indigo-600 dark:focus:ring-indigo-500"
                            />
                            <Text className="ml-2 block text-sm">
                                Recordarme
                            </Text>
                        </div>

                        <div>
                            <PrimaryButton
                                className="flex w-full justify-center rounded-md 
                                    bg-indigo-600 dark:bg-indigo-500 
                                    hover:bg-indigo-500 dark:hover:bg-indigo-400 
                                    px-3 py-1.5 text-sm font-semibold leading-6 text-white 
                                    shadow-sm focus-visible:outline focus-visible:outline-2 
                                    focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
                                    dark:focus-visible:outline-indigo-500"
                                disabled={processing}
                            >
                                Iniciar Sesión
                            </PrimaryButton>
                        </div>
                    </form>

                    <Text className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                        ¿No tienes una cuenta?{' '}
                        <Link
                            href={route('register')}
                            className="font-semibold text-indigo-600 hover:text-indigo-500 
                                dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            Regístrate aquí
                        </Link>
                    </Text>
                </div>
            </div>
        </GuestLayout>
    );
}
