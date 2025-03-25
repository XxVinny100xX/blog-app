# Usa uma imagem oficial do Node.js
FROM node:20-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# Garante que o cache do Vite seja atualizado
ENV HOST=0.0.0.0

# Comando para rodar a aplicação
CMD ["npm", "run", "dev", "--", "--host"]
