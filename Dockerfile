# ���������� ����������� ����� Node.js � ������ �������
FROM node:16

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

RUN npm install -g http-server

EXPOSE 8080

# ��������� http-server ��� ������� ������ �� ���������� dist
CMD ["http-server", "dist"]