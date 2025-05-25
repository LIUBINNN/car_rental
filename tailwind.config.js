/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // App Router 下的页面/组件
    "./components/**/*.{js,ts,jsx,tsx}", // 组件目录
    "./styles/**/*.{css}"                // 如果你有 styles 文件夹
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}