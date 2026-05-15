# Alibaba Cloud ECS Strategic Management & Analysis

Repository ini berisi dokumentasi teknis dan alat bantu visual (dashboard mockups) untuk manajemen strategis instans **Alibaba Cloud Elastic Compute Service (ECS)**. Proyek ini bertujuan untuk mendemonstrasikan pemahaman mendalam tentang arsitektur cloud, manajemen siklus hidup instans, dan optimasi biaya. Proyek ini dibuat dengan bantuan AI Claude berdasarkan pengalaman pengguna terhadap course di Alibaba Academy. **AI-assisted Mockup**.

## 📂 Struktur Folder
* `Laporan Teknis/`: Berisi dokumen laporan mendalam mengenai strategi manajemen ECS.
* `alibaba-calculator.html`: Dashboard interaktif simulasi perhitungan biaya (Pay-as-you-go vs Subscription).
* `alibaba-console.html`: Visualisasi antarmuka manajemen ECS untuk konfigurasi VPC, VSwitch, dan Security Groups.

## 🚀 Fitur Utama
1.  **Analisis Taksonomi Instans**: Penjelasan mendalam mengenai keluarga instans (General Purpose, Compute Optimized, dsb.) dan iterasi generasi hardware.
2.  **Optimasi Finansial**: Perhitungan titik impas (*Break-Even Point*) untuk pemilihan model penagihan yang paling efisien.
3.  **Keamanan & Resiliensi**: Implementasi *Release Protection*, *Snapshots*, dan segmentasi jaringan melalui VPC di wilayah Singapura.
4.  **Deployment Otomatis**: Strategi penggunaan *Custom Image* untuk efisiensi waktu deployment hingga 95%.

## 🛠️ Teknologi & Layanan
* **Provider**: Alibaba Cloud
* **Core Service**: Elastic Compute Service (ECS)
* **Networking**: Virtual Private Cloud (VPC), VSwitch, Elastic IP (EIP)
* **Security**: Security Groups, Snapshots, Image Management
* **Analytics**: Alibaba Cloud Pricing Calculator

## 📈 Hasil Analisis
Proyek ini berhasil memetakan bahwa penggunaan model **Subscription** lebih menguntungkan secara finansial jika instans berjalan lebih dari **14 hari** secara konsisten dibandingkan model **Pay-as-you-go**. Selain itu, implementasi *Custom Image* terbukti mampu memangkas waktu persiapan server secara signifikan.

---
*Dibuat sebagai bagian dari pembelajaran Cloud Computing dan Manajemen Infrastruktur IT.*
