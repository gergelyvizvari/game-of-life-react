
import typography from "@tailwindcss/typography"

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'inherited', // add required value here          
          },
        }
      }),
    },
  },
  plugins: [    
    typography,
  ],  
}
