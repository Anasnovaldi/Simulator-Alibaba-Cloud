# Alibaba Cloud ECS Strategic Management & Analysis

Repository ini berisi dokumentasi teknis dan alat bantu visual (dashboard mockups) untuk manajemen strategis instans **Alibaba Cloud Elastic Compute Service (ECS)**. Proyek ini mendemonstrasikan pemahaman mendalam tentang arsitektur cloud, manajemen siklus hidup instans, dan optimasi biaya.

## 📂 Struktur Repositori
* **`calculator/`**: Berisi simulator interaktif untuk membandingkan model penagihan *Pay-as-you-go* vs *Subscription*.
* **`console/`**: Dashboard mockup yang mensimulasikan manajemen operasional ECS, pemantauan sumber daya, dan log aktivitas.
* **`docs/`**: Laporan teknis mendalam mengenai strategi manajemen instans (Format PDF/Docx).
* **`LICENSE`**: Lisensi MIT yang memberikan izin penggunaan dan modifikasi kode secara terbuka.

## 🚀 Fitur Utama
1.  **Analisis Taksonomi Instans**: Penjelasan mengenai keluarga instans (General Purpose, Compute Optimized, dll.) dan iterasi generasi hardware.
2.  **Optimasi Finansial**: Fitur kalkulator untuk menentukan titik impas (*Break-Even Point*) guna pemilihan model biaya yang paling efisien.
3.  **Manajemen Siklus Hidup**: Simulasi proses *Start*, *Stop*, hingga *Release* instans dengan pemantauan metrik CPU dan Network secara real-time.
4.  **Strategi Keamanan**: Implementasi *Release Protection*, *Snapshots*, dan segmentasi jaringan melalui VPC.

## 🛠️ Teknologi & Layanan
* **Provider**: Alibaba Cloud
* **Core Service**: Elastic Compute Service (ECS)
* **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
* **Networking**: Virtual Private Cloud (VPC), VSwitch, Security Groups
* **Concepts**: Pay-as-you-go, Subscription, Preemptible Instances, Custom Image Deployment

---
*Dibuat oleh Anas Novaldi sebagai bagian dari eksplorasi teknologi Cloud Computing dan Manajemen Infrastruktur IT.*
