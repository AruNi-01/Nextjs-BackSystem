/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "antd-blue": "#1677ff",
      },
      backgroundImage: {
        'root-background': "url('/bg.jpg')",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // 禁止设置初始值，会覆盖其他样式库
  },
};
