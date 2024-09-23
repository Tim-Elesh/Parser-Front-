FROM node:14

# ������������� ������� ����������
WORKDIR /app

# �������� package.json � package-lock.json
COPY package*.json ./

# ������������� �����������
RUN npm install

# �������� ��������� ����� �������
COPY . .

# ��������� ������ �������
RUN npm run build

# ������������� ��������� http-server
RUN npm install -g http-server

# ��������� ���� 8080
EXPOSE 8080

# ��������� http-server ��� ������� ������ �� ���������� dist
CMD ["http-server", "dist"]