export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'windows-gray': '#c0c0c0',
                'windows-dark': '#808080',
                'windows-blue': '#000080',
                'windows-light': '#ffffff',
            },
            fontFamily: {
                'windows': ['"Press Start 2P"', 'cursive'],
            },
        },
    },
    plugins: [],
};