const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './app/helpers/**/*.rb',
        './app/javascript/**/*.js',
        './app/views/**/*'
    ],
    theme: {
        extend: {
            container:{
                center: true,
                padding: '1rem'
            },
            keyframes: {
                pop_in_right: {
                    '0%': {
                        'transform': 'scale(0)',
                        'transform-origin': 'right',
                        'opacity': '0'
                    },
                    '100%':{
                        'transform': 'scale(1)',
                        'opacity': '1',
                        'transform-origin': 'right'
                    }
                },
                pop_in_left: {
                    '0%': {
                        'transform': 'scale(0)',
                        'transform-origin': 'left',
                        'opacity': '0'
                    },
                    '100%':{
                        'transform': 'scale(1)',
                        'opacity': '1',
                        'transform-origin': 'left'
                    }
                },
            },
            animation: {
                'pop_in_right': 'pop_in_right 0.5s ease-in-out',
                'pop_in_left': 'pop_in_left 0.5s ease-in-out',
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),]
}
