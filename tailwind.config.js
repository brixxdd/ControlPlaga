import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Colores personalizados para texto
                primary: {
                    text: {
                        light: '#1F2937', // texto oscuro para modo claro
                        dark: '#F3F4F6',  // texto claro para modo oscuro
                    }
                },
                // Colores personalizados para fondos
                primary: {
                    bg: {
                        light: '#FFFFFF', // fondo claro
                        dark: '#1F2937',  // fondo oscuro
                    }
                }
            }
        },
    },

    plugins: [forms],
};
