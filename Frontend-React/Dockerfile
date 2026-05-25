FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json dan install dependensi
COPY package*.json ./
RUN npm install

# Copy sisa file proyek
COPY . .

# Expose port untuk React dev server
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]