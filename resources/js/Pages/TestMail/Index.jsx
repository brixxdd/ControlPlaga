import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import AppLayout from '@/Layouts/AppLayout';

export default function TestMail({ flash }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('test.mail.send'));
    };

    return (
        <AppLayout>
            <Head title="Prueba de Correo" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-lg font-medium mb-4">Prueba de envío de correo</h2>
                            
                            {flash.success && (
                                <div className="mb-4 text-sm font-medium text-green-600">
                                    {flash.success}
                                </div>
                            )}
                            
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Correo electrónico
                                    </label>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                
                                <PrimaryButton disabled={processing}>
                                    Enviar correo de prueba
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 