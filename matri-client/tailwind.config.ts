import type { Config } from 'tailwindcss'
const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}',
        './src/app/globals.css'], theme: { extend: {}, }, plugins: [],
}
export default config;