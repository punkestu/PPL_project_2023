<p align="center">
  <img width="460" height="460" src="https://github.com/punkestu/PPL_project_2023/blob/master/coffeeconnect.png">
</p>

# Projek CoffeeConnect
_PPL TI B9 - 2023_

_"Kopi yang enak akan selalu menemukan penikmatnya"_

## Pengenalan
**CoffeConnect** adalah aplikasi yang dapat digunakan sebagai media sharing informasi mengenai kedai kopi di berbagai tempat.

Pada aplikasi ini akan terdapat 2 role yang dapat digunakan yaitu Customer dan Penjual (Kedai kopi). Role customer nantinya bisa digunakan untuk mencari dan memberi informasi tentang kedai kopi yang tersebar di berbagai tempat. Sedangkan role penjual akan mewakili kedai kopi itu sendiri yang dapat menawarkan informasi tentang kedai kopi mereka + mendapat fitur untuk melakukan pengelolaan data penjualan.

## Tujuan
Projek Ini dibuat karena melihat kondisi di lapangan bahwa ada banyak kedai kopi yang baru merintis namun kesulitan untuk mengelola data penjualan dan marketing. Oleh karena itu dengan dibuatnya projek ini diharap akan membantu meningkatkan produktifitas dan penjualan kedai kopi yang baru dirintis dengan menawarkan fitur-fitur yang dapat digunakan untuk mengelola data penjualan dan marketing.

Projek ini dibuat sebagai bentuk pengerjaan tugas akhir mata kuliah **Perancangan Perangkat Lunak Kelas D** Fakultas Ilmu Komputer 2023. Dengan dikerjakannya projek ini diharapkan nantinya kami dapat memahami bagaimana alur perancangan dan pembangunan sebuah perangkat lunak pada kasus nyata.

## Infrastruktur
Projek ini dibangun menggunakan bahasa pemrograman **JavaScript** dengan menggunakan framework **Nodejs** dan **Prisma**. Database yang digunakan adalah **PostgreSQL** dan view engine yang digunakan adalah **Handlebars**.

## Instalasi
1. Jalankan instalasi modul nodejs
```
npm install
```
2. Copy ```.env.example``` ke ```.env```
3. Masukan username dan password postgresql pada file ```.env```
4. Migrasi database
```
npm run migrate
```
5. Generate orm client
```
npx prisma generate
```
6. Seed database
```
npm run seed
```
(optional) Jika ingin mengganti data preparasi dapat menjalankan lagi perintah preparasi
```
npm run prepare
```
(optional) Set NODE_ENV sebagai "production" atau "development" pada ```.env``` lalu jalankan aplikasi dengan ```npm run start``` atau ```npm run dev``` untuk development.
